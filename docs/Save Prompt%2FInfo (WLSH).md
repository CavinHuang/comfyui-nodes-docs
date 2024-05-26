# Documentation
- Class name: WLSH_Save_Prompt_File_Info
- Category: WLSH Nodes/IO
- Output node: True
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在保存有关提示实验的文本信息，确保诸如正面和负面提示、模型名称和其他相关元数据等细节得到安全存储和组织。它便于为未来的参考和分析保存宝贵数据。

# Input types
## Required
- filename
    - 文件名参数至关重要，因为它定义了保存提示信息的文件的基本名称。这对于识别和组织保存的数据至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - 正面参数包含实验中使用的正面提示文本。它很重要，因为它为将要保存的数据设置了上下文，并且是将要保存在文件中的记录的一部分。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面参数保存负面提示文本，它也是实验数据的一部分。这对于保存信息的完整性和未来的分析是必要的。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 种子参数用于确保实验的可重复性。它是记录的重要部分，因为它允许在相同条件下重现实验。
    - Comfy dtype: INT
    - Python dtype: int
- modelname
    - 模型名称参数指示实验中使用的模型名称。这对于跟踪数据来源和未来参考至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- counter
    - 计数器参数是一个整数，可用于区分多次保存或跟踪进行的实验次数。它有助于保存文件的组织和索引。
    - Comfy dtype: INT
    - Python dtype: int
- time_format
    - 时间格式参数决定了文件名中时间戳的格式。它对于维护保存文件的一致和可读结构很重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- path
    - 路径参数指定了文件将被保存的目录。它在组织文件系统内的文件和确保数据存储在所需位置方面起着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
- info
    - 信息参数包含有关实验的其他元数据，如配置设置和其他细节。它通过更多上下文丰富了保存的数据，并有助于全面分析。
    - Comfy dtype: INFO
    - Python dtype: Dict[str, Any]

# Output types
- text_data
    - 文本数据代表从输入中编译的信息，包括正面和负面提示、模型名称以及其他元数据。它是将要保存在文本文件中的内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Save_Prompt_File_Info:

    def __init__(self):
        self.output_dir = folder_paths.output_directory

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'filename': ('STRING', {'default': 'info', 'multiline': False}), 'path': ('STRING', {'default': '', 'multiline': False}), 'positive': ('STRING', {'default': '', 'multiline': True, 'forceInput': True})}, 'optional': {'negative': ('STRING', {'default': '', 'multiline': True, 'forceInput': True}), 'modelname': ('STRING', {'default': '', 'multiline': False, 'forceInput': True}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'forceInput': True}), 'counter': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'time_format': ('STRING', {'default': '%Y-%m-%d-%H%M%S', 'multiline': False}), 'info': ('INFO',)}}
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = 'save_text_file'
    CATEGORY = 'WLSH Nodes/IO'

    def save_text_file(self, positive='', negative='', seed=-1, modelname='unknown', info=None, path='', counter=0, time_format='%Y-%m-%d-%H%M%S', filename=''):
        output_path = os.path.join(self.output_dir, path)
        if output_path.strip() != '':
            if not os.path.exists(output_path.strip()):
                print(f"The path `{output_path.strip()}` specified doesn't exist! Creating directory.")
                os.makedirs(output_path, exist_ok=True)
        text_data = make_comment(positive, negative, modelname, seed, info)
        filename = make_filename(filename, seed, modelname, counter, time_format)
        self.writeTextFile(os.path.join(output_path, filename + '.txt'), text_data)
        return (text_data,)

    def writeTextFile(self, file, content):
        try:
            with open(file, 'w') as f:
                f.write(content)
        except OSError:
            print(f'Error: Unable to save file `{file}`')
```