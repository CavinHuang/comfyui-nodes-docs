# Documentation
- Class name: WAS_Text_Parse_Embeddings_By_Name
- Category: WAS Suite/Text/Parse
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

`text_parse_embeddings` 方法旨在解析并替换文本为相应的嵌入。它通过识别输入文本中的特定模式，这些模式与嵌入文件的名称匹配，并将它们替换为包含单词 'embedding' 后跟文件名的预定义格式。这个过程对于准备文本数据以进行进一步的处理或利用基于嵌入的模型的分析至关重要。

# Input types
## Required
- text
    - ‘text’ 参数至关重要，因为它提供了节点将处理的原始文本数据。这是节点执行模式匹配和替换以嵌入适当引用嵌入文件的输入。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- parsed_text
    - ‘parsed_text’ 输出包含带有适当格式化的嵌入引用的修改后的文本。它是节点操作的结果，对于任何需要使用嵌入数据的后续步骤都很重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Parse_Embeddings_By_Name:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'text_parse_embeddings'
    CATEGORY = 'WAS Suite/Text/Parse'

    def text_parse_embeddings(self, text):
        return (self.convert_a1111_embeddings(text),)

    def convert_a1111_embeddings(self, text):
        for embeddings_path in comfy_paths.folder_names_and_paths['embeddings'][0]:
            for filename in os.listdir(embeddings_path):
                (basename, ext) = os.path.splitext(filename)
                pattern = re.compile('\\b{}\\b'.format(re.escape(basename)))
                replacement = 'embedding:{}'.format(basename)
                text = re.sub(pattern, replacement, text)
        return text
```