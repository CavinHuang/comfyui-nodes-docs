# Documentation
- Class name: LoadTextFile
- Category: 😺dzNodes/WordCloud
- Output node: True
- Repo Ref: https://github.com/chflame163/ComfyUI_WordCloud.git

LoadTextFile节点旨在读取并检索指定文本文件的内容。它通过打开给定路径的文件并以UTF-8编码来操作，确保与各种字符集兼容。该节点的主要功能是为工作流中的进一步处理或分析提供文本数据。

# Input types
## Required
- path
    - ‘path’参数对于节点的操作至关重要，因为它指定了要加载的文本文件的位置。它直接影响节点访问和读取文件内容的能力，这对于工作流中的后续任务至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- Text
    - 'Text'输出参数代表加载的文本文件的内容。它很重要，因为它是节点的主要输出，为下游处理或分析提供文本数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class LoadTextFile:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'path': ('STRING', {'default': 'c:\\text.txt'})}, 'optional': {}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('Text',)
    FUNCTION = 'load_text_file'
    OUTPUT_NODE = True
    CATEGORY = '😺dzNodes/WordCloud'

    def load_text_file(self, path):
        text_content = ''
        try:
            with open(os.path.normpath(path), 'r', encoding='utf-8') as f:
                text_content = ''.join((str(l) for l in f.read()))
            print('# 😺dzNodes: Load Text File -> ' + path + ' success.')
        except Exception as e:
            print('# 😺dzNodes: Load Text File -> ERROR, ' + path + ', ' + repr(e))
        return {'ui': {'text': text_content}, 'result': (text_content,)}
```