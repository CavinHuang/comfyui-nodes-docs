# Documentation
- Class name: ShowTextForGPT
- Category: ♾️Mixlab/GPT
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

ShowTextForGPT节点旨在处理和输出文本数据。它接受各种文本输入并将它们写入输出文件，确保每个字符串得到适当处理和存储。该节点对于需要文本生成和随后的文件管理的任务至关重要，为文本处理提供了简化的工作流程。

# Input types
## Required
- text
    - ‘text’参数至关重要，因为它代表将由节点处理的数据。这是决定输出内容和性质的主要输入。没有这个输入，节点将没有任何数据可以处理，使其成为节点运行的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- output_dir
    - ‘output_dir’参数用于指定处理后的文本将被保存的位置，这对输出文件的组织和可访问性产生影响，允许更好地管理和检索结果。这个参数是可选的，但在使用时增强了节点的功能。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ui.text
    - ‘ui.text’输出参数作为处理后的文本数据的表示。它是输入的直接反映，展示了节点有效处理和输出文本的能力。这个输出对于在用户界面中可视化结果非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- result
    - ‘result’输出参数是处理后的文本数据的集合，表明节点操作的成功完成。这是至关重要的输出，因为它提供了节点功能和文本处理有效性的证据。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class ShowTextForGPT:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'forceInput': True, 'dynamicPrompts': False})}, 'optional': {'output_dir': ('STRING', {'forceInput': True, 'default': '', 'multiline': True, 'dynamicPrompts': False})}}
    INPUT_IS_LIST = True
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'run'
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (True,)
    CATEGORY = '♾️Mixlab/GPT'

    def run(self, text, output_dir=['']):
        texts = []
        for t in text:
            if not isinstance(t, str):
                t = str(t)
            texts.append(t)
        text = texts
        if len(output_dir) == 1 and (output_dir[0] == '' or os.path.dirname(output_dir[0]) == ''):
            t = '\n'.join(text)
            output_dir = [os.path.join(folder_paths.get_temp_directory(), get_unique_hash(t) + '.txt')]
        elif len(output_dir) == 1:
            base = os.path.basename(output_dir[0])
            t = '\n'.join(text)
            if base == '' or os.path.splitext(base)[1] == '':
                base = get_unique_hash(t) + '.txt'
            output_dir = [os.path.join(output_dir[0], base)]
        if len(output_dir) == 1 and len(text) > 1:
            output_dir = [output_dir[0] for _ in range(len(text))]
        for i in range(len(text)):
            o_fp = output_dir[i]
            dirp = os.path.dirname(o_fp)
            if dirp == '':
                dirp = folder_paths.get_temp_directory()
                o_fp = os.path.join(folder_paths.get_temp_directory(), o_fp)
            if not os.path.exists(dirp):
                os.mkdir(dirp)
            if not os.path.splitext(o_fp)[1].lower() == '.txt':
                o_fp = o_fp + '.txt'
            t = text[i]
            with open(o_fp, 'w') as file:
                file.write(t)
        return {'ui': {'text': text}, 'result': (text,)}
```