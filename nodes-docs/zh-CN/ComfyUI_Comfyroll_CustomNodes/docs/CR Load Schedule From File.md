# Documentation
- Class name: CR_LoadScheduleFromFile
- Category: Comfyroll/Animation/Schedule
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoadScheduleFromFile 是一个用于从文件导入调度数据的节点，它便于管理和组织动画序列。它充当文件系统和动画工作流程之间的桥梁，允许用户将关键帧或提示数据加载并解析成可在动画流程中进一步处理的可用格式。

# Input types
## Required
- input_file_path
    - input_file_path 参数指定了调度文件所在的目录。这对于节点正确识别和访问包含调度数据的文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- file_name
    - file_name 参数表示要加载的调度文件的名称。它在文件识别中起着重要作用，对于节点处理正确的数据集至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- file_extension
    - file_extension 参数确定调度文件的格式，允许节点应用正确的解析方法。它是确保数据被准确读取和解释的重要因素。
    - Comfy dtype: COMBO['txt', 'csv']
    - Python dtype: str

# Output types
- SCHEDULE
    - SCHEDULE 输出提供了调度文件解析后的内容，可在动画环境中使用。它代表了从文件中提取的结构化数据。
    - Comfy dtype: STRING
    - Python dtype: List[List[str]]
- show_text
    - show_text 输出提供了解析后的调度数据的文本表示，可用于应用程序中的显示或调试目的。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoadScheduleFromFile:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_file_path': ('STRING', {'multiline': False, 'default': ''}), 'file_name': ('STRING', {'multiline': False, 'default': ''}), 'file_extension': (['txt', 'csv'],)}}
    RETURN_TYPES = ('SCHEDULE', 'STRING')
    RETURN_NAMES = ('SCHEDULE', 'show_text')
    FUNCTION = 'csvinput'
    CATEGORY = icons.get('Comfyroll/Animation/Schedule')

    def csvinput(self, input_file_path, file_name, file_extension):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Schedule-Nodes#cr-load-schedule-from-file'
        filepath = input_file_path + '\\' + file_name + '.' + file_extension
        print(f'CR Load Schedule From File: Loading {filepath}')
        lists = []
        if file_extension == 'csv':
            with open(filepath, 'r') as csv_file:
                reader = csv.reader(csv_file)
                for row in reader:
                    lists.append(row)
        else:
            with open(filepath, 'r') as txt_file:
                for row in txt_file:
                    parts = row.strip().split(',', 1)
                    if len(parts) >= 2:
                        second_part = parts[1].strip('"')
                        lists.append([parts[0], second_part])
        return (lists, str(lists))
```