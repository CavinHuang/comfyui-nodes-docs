# Documentation
- Class name: WLSH_Save_Positive_Prompt_File
- Category: WLSH Nodes/IO
- Output node: True
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Save_Positive_Prompt_File 节点旨在管理文本数据的存储。它接收一个提示并将其保存到指定的文件中，确保数据被持久存储以供将来使用。此节点在维护积极提示的记录中扮演着至关重要的角色，这对于各种应用（如训练模型或内容分析）可能至关重要。

# Input types
## Required
- filename
    - 文件名参数指定了将保存积极提示的文件的名称。它对于标识已保存的数据至关重要，并且对于节点的操作至关重要，因为它决定了输出目录内文件的身份。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - 积极参数代表要作为积极提示保存的文本内容。它是节点的强制性输入，因为它是节点设计要处理和保存的核心数据。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- path
    - 路径参数决定了将保存文件的目录。它是可选的，如果没有提供，则会使用默认目录。此参数通过指定文件存储位置来影响节点的执行。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive
    - save_text_file 函数的输出是保存到文件的积极提示。此输出表示成功存储了输入数据，对于确认节点的操作很重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Save_Positive_Prompt_File:

    def __init__(self):
        self.output_dir = folder_paths.output_directory

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'filename': ('STRING', {'default': 'info', 'multiline': False}), 'path': ('STRING', {'default': '', 'multiline': False}), 'positive': ('STRING', {'default': '', 'multiline': True, 'forceInput': True})}}
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = 'save_text_file'
    CATEGORY = 'WLSH Nodes/IO'

    def save_text_file(self, positive='', path='', filename=''):
        output_path = os.path.join(self.output_dir, path)
        if output_path.strip() != '':
            if not os.path.exists(output_path.strip()):
                print(f"The path `{output_path.strip()}` specified doesn't exist! Creating directory.")
                os.makedirs(output_path, exist_ok=True)
        if filename.strip == '':
            print(f'Warning: There is no text specified to save! Text is empty.  Saving file with timestamp')
            filename = get_timestamp('%Y%m%d%H%M%S')
        if positive == '':
            positive = 'No prompt data'
        self.writeTextFile(os.path.join(output_path, filename + '.txt'), positive)
        return (positive,)

    def writeTextFile(self, file, content):
        try:
            with open(file, 'w') as f:
                f.write(content)
        except OSError:
            print(f'Error: Unable to save file `{file}`')
```