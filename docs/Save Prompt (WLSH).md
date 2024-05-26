# Documentation
- Class name: WLSH_Save_Prompt_File
- Category: WLSH Nodes/IO
- Output node: True
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在将文本数据保存到文件中，提供一种以人类可读格式持久化信息的手段。它封装了将文本写入文件的过程，确保数据存储在指定目录中，并使用用户定义的文件名。节点的主要功能是促进创建和维护文本记录，这对于记录实验、记录输出或存档数据至关重要。

# Input types
## Required
- filename
    - 文件名参数对于指定输出文件的名称至关重要。它决定了保存数据的引用方式，是文件身份的关键部分，使用户能够轻松定位和引用保存的文本数据。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - 正面参数包含代表正在保存的数据的积极方面或期望结果的文本。它对于提供背景和理解保存信息背后的目的很重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- path
    - 路径参数定义了文件将被保存的目录。它在组织文件系统以及确保保存的文件在所需位置可访问和结构良好方面发挥着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面参数包括代表不希望的结果或应避免的方面的文本。它对于澄清数据的意图和目标至关重要，确保保存的内容被正确解释。
    - Comfy dtype: STRING
    - Python dtype: str
- modelname
    - 模型名称参数指定用于生成数据的模型名称。它对于跟踪数据来源很重要，并且对未来的参考和分析可能有用。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 种子参数用于确保结果的可复现性。它对于保持相同过程不同运行之间的一致性很重要，这对于可靠和可验证的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- counter
    - 计数器参数用于向文件名附加一个数值，这对于区分同一数据的多个保存或版本很重要。
    - Comfy dtype: INT
    - Python dtype: int
- time_format
    - 时间格式参数指定用于时间戳文件名的格式。它对于加入一个基于创建时间的独特且可识别的元素很重要，这对于按时间顺序排序和定位文件很有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text_data
    - 文本数据输出代表保存的内容，其中包括正面和负面提示以及任何指定的附加信息。它是节点操作的成果，并且作为已持久化数据的记录。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Save_Prompt_File:

    def __init__(self):
        self.output_dir = folder_paths.output_directory

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'filename': ('STRING', {'default': 'info', 'multiline': False}), 'path': ('STRING', {'default': '', 'multiline': False}), 'positive': ('STRING', {'default': '', 'multiline': True, 'forceInput': True})}, 'optional': {'negative': ('STRING', {'default': '', 'multiline': True, 'forceInput': True}), 'modelname': ('STRING', {'default': '', 'multiline': False, 'forceInput': True}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'forceInput': True}), 'counter': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'time_format': ('STRING', {'default': '%Y-%m-%d-%H%M%S', 'multiline': False})}}
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = 'save_text_file'
    CATEGORY = 'WLSH Nodes/IO'

    def save_text_file(self, positive='', negative='', seed=-1, modelname='unknown', path='', counter=0, time_format='%Y-%m-%d-%H%M%S', filename=''):
        output_path = os.path.join(self.output_dir, path)
        if output_path.strip() != '':
            if not os.path.exists(output_path.strip()):
                print(f"The path `{output_path.strip()}` specified doesn't exist! Creating directory.")
                os.makedirs(output_path, exist_ok=True)
        text_data = make_comment(positive, negative, modelname, seed, info=None)
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