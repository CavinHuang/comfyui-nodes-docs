# Documentation
- Class name: CR_OutputScheduleToFile
- Category: Comfyroll/Animation/Schedule
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_OutputScheduleToFile节点旨在将调度数据输出到文件中进行管理。它接收输出文件路径、文件名、调度和文件扩展名等参数，然后生成指定格式的文件，确保文件名唯一以避免覆盖现有文件。

# Input types
## Required
- output_file_path
    - output_file_path参数指定了输出文件将要保存的目录。它对于确定文件的位置至关重要，对于节点的操作也是必需的，因为它指导了输出应该存储在哪里。
    - Comfy dtype: STRING
    - Python dtype: str
- file_name
    - file_name参数定义了输出文件的基本名称，不包括扩展名。它在标识文件中起着重要作用，对于节点创建一个不与目录中现有文件冲突的唯一文件名是必要的。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule
    - schedule参数包含将要写入文件的数据。它是一个关键的输入，因为它代表了节点负责输出的内容。预期schedule数据的格式可以写入文本或CSV文件。
    - Comfy dtype: SCHEDULE
    - Python dtype: List[Any]
## Optional
- file_extension
    - file_extension参数决定了输出文件的格式。它是可选的，但很重要，因为它决定了文件将具有的数据结构类型。节点支持'txt'和'csv'扩展名，这些扩展名对应于不同的文本格式。
    - Comfy dtype: COMBO['txt', 'csv']
    - Python dtype: str

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class CR_OutputScheduleToFile:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'output_file_path': ('STRING', {'multiline': False, 'default': ''}), 'file_name': ('STRING', {'multiline': False, 'default': ''}), 'file_extension': (['txt', 'csv'],), 'schedule': ('SCHEDULE',)}}
    RETURN_TYPES = ()
    OUTPUT_NODE = True
    FUNCTION = 'csvoutput'
    CATEGORY = icons.get('Comfyroll/Animation/Schedule')

    def csvoutput(self, output_file_path, file_name, schedule, file_extension):
        filepath = output_file_path + '\\' + file_name + '.' + file_extension
        index = 2
        if output_file_path == '' or file_name == '':
            print(f'[Warning] CR Output Schedule To File. No file details found. No file output.')
            return ()
        while os.path.exists(filepath):
            if os.path.exists(filepath):
                filepath = output_file_path + '\\' + file_name + str(index) + '.' + file_extension
                index = index + 1
            else:
                break
        print(f'[Info] CR Output Schedule To File: Saving to {filepath}')
        if file_extension == 'csv':
            with open(filepath, 'w', newline='') as csv_file:
                csv_writer = csv.writer(csv_file)
                csv_writer.writerows(schedule)
        else:
            with open(filepath, 'w', newline='') as text_writer:
                for line in schedule:
                    str_item = f'{line[0]},"{line[1]}"\n'
                    text_writer.write(str_item)
        return ()
```