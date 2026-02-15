import type { Preview } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';
import * as prettier from 'prettier/standalone';
import * as prettierPluginHtml from 'prettier/plugins/html';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import * as prettierPluginTypescript from 'prettier/plugins/typescript';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup'; // HTML/XML
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism.css'; // 默认主题
import '../src/styles/variables/index.scss';
import '../src/styles/global/global.style.scss';
import '../src/components/icon/index';
import '../src/components/button/index';

// 从 render 函数中提取源代码
const extractSourceCode = (storyFn: any, context: any) => {
  let sourceCode = '';
  
  // 优先使用手动指定的源代码
  if (context.parameters.docs?.source?.code) {
    sourceCode = context.parameters.docs.source.code;
  } else {
    // 尝试从 render 函数中提取
    if (context.originalStoryFn || storyFn) {
      const fn = context.originalStoryFn || storyFn;
      if (fn && typeof fn === 'function') {
        const fnString = fn.toString();
        
        // 改进的提取算法：使用栈来匹配嵌套的反引号
        const htmlIndex = fnString.indexOf('html`');
        if (htmlIndex !== -1) {
          const startIndex = htmlIndex + 5; // 'html`' 的长度
          let depth = 1; // 反引号嵌套深度
          let inTemplate = false;
          let i = startIndex;
          
          // 遍历字符串，跟踪嵌套的 ${} 和反引号
          while (i < fnString.length && depth > 0) {
            const char = fnString[i];
            const prevChar = i > 0 ? fnString[i - 1] : '';
            
            // 检测 ${ 的开始
            if (char === '{' && prevChar === '$') {
              inTemplate = true;
            } else if (char === '}' && inTemplate) { // 检测 } 的结束
              // 检查是否是 ${} 的结束
              let braceDepth = 1;
              let j = i - 1;
              while (j >= startIndex && braceDepth > 0) {
                if (fnString[j] === '}') braceDepth++;
                else if (fnString[j] === '{') braceDepth--;
                j--;
              }
              if (braceDepth === 0) {
                inTemplate = false;
              }
            } else if (char === '`' && prevChar !== '\\') { // 检测反引号
              if (inTemplate) {
                // 在 ${} 内的反引号，不影响主模板
              } else {
                depth--;
                if (depth === 0) {
                  // 找到匹配的结束反引号
                  sourceCode = fnString.substring(startIndex, i);
                  break;
                }
              }
            }
            
            i++;
          }
        }
      }
    }
  }

  // 统一清理所有源代码的缩进
  return sourceCode ? cleanupCode(sourceCode) : '';
};

// 清理提取的代码
const cleanupCode = (code: string): string => {
  if (!code) return '';
  
  // 移除首尾空白
  code = code.trim();
  
  // 分割成行
  const lines = code.split('\n');
  
  if (lines.length === 0) {
    return '';
  }
  
  // 移除首尾的空行
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  
  if (lines.length === 0) {
    return '';
  }
  
  // 找到所有非空行并计算它们的缩进
  const lineIndents: Array<{ line: string; indent: number; index: number }> = [];
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      // 计算前导空白数量
      const leadingSpaces = line.length - line.trimStart().length;
      lineIndents.push({ line, indent: leadingSpaces, index });
    }
  });
  
  if (lineIndents.length === 0) {
    return '';
  }
  
  // 找到最小缩进
  const minIndent = Math.min(...lineIndents.map(item => item.indent));
  
  // 如果最小缩进为0，直接返回（已经没有多余缩进）
  if (minIndent === 0) {
    return lines.join('\n');
  }
  
  // 移除所有行的最小缩进
  const cleanedLines = lines.map(line => {
    // 空行保持为空
    if (line.trim().length === 0) {
      return '';
    }
    // 移除最小缩进量的空格
    return line.substring(Math.min(minIndent, line.length));
  });
  
  // 合并并返回
  return cleanedLines.join('\n');
};

// 检测代码语言和对应的 Prettier parser
const detectLanguage = (code: string): { language: string; parser: string } => {
  // 如果包含 HTML 标签，认为是 HTML
  if (/<[^>]+>/.test(code)) {
    return { language: 'markup', parser: 'html' };
  }
  
  // 如果包含常见的 TypeScript 特征
  if (/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(code) ||
      /interface\s+\w+/.test(code) ||
      /type\s+\w+\s*=/.test(code) ||
      /<\w+>/.test(code.replace(/<[^>]+>/g, ''))) { // 泛型
    return { language: 'typescript', parser: 'typescript' };
  }
  
  // 如果包含常见的 JavaScript 关键字
  if (/\b(function|const|let|var|class|import|export|async|await)\b/.test(code)) {
    return { language: 'javascript', parser: 'babel' };
  }
  
  // 默认使用 HTML
  return { language: 'markup', parser: 'html' };
};

// 使用 Prettier 格式化代码
const formatCode = async(code: string, parser: string): Promise<string> => {
  try {
    const formatted = await prettier.format(code, {
      parser,
      plugins: [prettierPluginHtml, prettierPluginBabel, prettierPluginEstree, prettierPluginTypescript] as any,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: false,
      trailingComma: 'none',
      bracketSpacing: true,
      htmlWhitespaceSensitivity: 'ignore'
    });
    return formatted.trim();
  } catch (error) {
    console.warn('Prettier formatting failed:', error);
    return code;
  }
};

// 格式化并高亮代码（异步）
const formatAndHighlight = async(sourceCode: string, langInfo: { language: string; parser: string }): Promise<string> => {
  // 1. 使用 Prettier 格式化代码
  const formattedCode = await formatCode(sourceCode, langInfo.parser);
  
  // 2. 使用 Prism 进行语法高亮
  const grammar = Prism.languages[langInfo.language];
  const highlightedCode = grammar 
    ? Prism.highlight(formattedCode, grammar, langInfo.language)
    : formattedCode;
  
  return highlightedCode;
};

// 自定义装饰器：为每个 story 添加代码查看和复制功能
const withSourceCode = (story: any, context: any) => {
  // 如果是 Overview story，不添加代码查看功能
  if (context.name === 'Overview') {
    return story();
  }

  // 获取源代码
  const sourceCode = extractSourceCode(story, context);
  
  // 如果没有源代码，直接返回 story
  if (!sourceCode) {
    return story();
  }

  // 获取语言信息：优先使用手动指定的，否则自动检测
  const manualLanguage = context.parameters.docs?.source?.language;
  let langInfo: { language: string; parser: string };
  
  if (manualLanguage) {
    // 手动指定的语言
    langInfo = {
      language: manualLanguage === 'html' ? 'markup' : manualLanguage,
      parser: manualLanguage === 'html' ? 'html' : manualLanguage === 'typescript' ? 'typescript' : 'babel'
    };
  } else {
    // 自动检测
    langInfo = detectLanguage(sourceCode);
  }
  
  // 异步格式化并高亮代码
  const highlightPromise = formatAndHighlight(sourceCode, langInfo);
  
  return html`
    <div class="story-wrapper">
      <div class="story-preview">
        ${ story() }
      </div>
      <div class="story-source" data-raw-code-promise="${ JSON.stringify({ sourceCode, parser: langInfo.parser }) }">
        <div class="story-source__toolbar">
          <nv-button text class="story-source__btn" @click="${ async(e: Event) => {
            const btn = e.currentTarget as HTMLElement;
            const wrapper = btn.closest('.story-source') as HTMLElement;
            const isExpanded = wrapper.classList.toggle('is-expanded');
            btn.innerHTML = isExpanded 
              ? '<nv-icon name="arrow-up"></nv-icon> 隐藏代码' 
              : '<nv-icon name="arrow-down"></nv-icon> 显示代码';
          } }">
            <nv-icon name="arrow-down"></nv-icon>
            显示代码
          </nv-button>
          <nv-button text class="story-source__btn" @click="${ async(e: Event) => {
            const btn = e.currentTarget as HTMLElement;
            const wrapper = btn.closest('.story-source') as HTMLElement;
            const dataStr = wrapper.getAttribute('data-raw-code-promise') || '';
            
            try {
              const data = JSON.parse(dataStr);
              const formatted = await formatCode(data.sourceCode, data.parser);
              
              navigator.clipboard.writeText(formatted).then(() => {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<nv-icon name="select"></nv-icon> 已复制！';
                setTimeout(() => {
                  btn.innerHTML = originalHTML;
                }, 2000);
              });
            } catch (error) {
              console.error('Copy failed:', error);
            }
          } }">
            <nv-icon name="document-copy"></nv-icon>
            复制代码
          </nv-button>
        </div>
        <div class="story-source__code">
          ${ until(
            highlightPromise.then(code => html`
              <pre class="language-${ langInfo.language }"><code class="language-${ langInfo.language }">${ unsafeHTML(code) }</code></pre>
            `),
            html`<pre><code>加载中...</code></pre>`
          ) }
        </div>
      </div>
      <style>
        .story-wrapper {
          margin: 0;
        }
        .story-preview {
          padding: 20px;
          background: #fff;
          border: 1px solid #e4e7ed;
          border-radius: 4px 4px 0 0;
        }
        .story-source {
          background: #fff;
          border: 1px solid #e4e7ed;
          border-top: none;
          border-radius: 0 0 4px 4px;
        }
        .story-source__toolbar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          height: 44px;
          padding: 0 20px;
          background-color: #fff;
          border-top: 1px solid #e4e7ed;
        }
        .story-source__btn {
          --nv-button-text-color: #409eff;
          --nv-button-text-color-hover: #66b1ff;
          gap: 6px;
        }
        .story-source__btn nv-icon {
          flex-shrink: 0;
          font-size: 14px;
        }
        .story-source__code {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: #fafafa;
        }
        .story-source.is-expanded .story-source__code {
          max-height: 600px;
          overflow: auto;
        }
        .story-source__code pre {
          margin: 0;
          padding: 20px;
          background: #f6f8fa;
          border-radius: 0 0 4px 4px;
        }
        .story-source__code code {
          font-family: 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.6;
          display: block;
        }
        /* 覆盖 Prism 的默认样式 */
        .story-source__code code[class*="language-"] {
          background: transparent;
          margin: 0;
          padding: 0;
          text-shadow: none;
        }
        .story-source__code pre[class*="language-"] {
          background: transparent;
          margin: 0;
          padding: 5px;
          text-shadow: none;
        }
      </style>
    </div>
  `;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      source: {
        type: 'dynamic',
        language: 'html'
      }
    },
    viewMode: 'docs', // 默认使用 docs 模式
    previewTabs: {
      'storybook/docs/panel': { index: -1 }, // docs 优先
      canvas: { title: 'Canvas' }
    }
  },
  decorators: [withSourceCode]
};

export default preview;
