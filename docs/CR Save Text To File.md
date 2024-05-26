# Documentation
- Class name: CR_SaveTextToFile
- Category: Comfyroll/Utils/Text
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SaveTextToFile节点旨在将文本数据保存到文件中。它提供处理多行文本的功能，并将文本写入指定的文件路径，使用给定的文件名和扩展名，确保文件具有唯一名称以避免覆盖现有文件。

# Input types
## Required
- multiline_text
    - 参数'multiline_text'保存需要保存的文本内容。它至关重要，因为它是节点将处理并写入文件的主要数据。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- output_file_path
    - 参数'output_file_path'指定了文件将被保存的目录。它是可选的，如果没有提供，将使用默认路径。
    - Comfy dtype: STRING
    - Python dtype: str
- file_name
    - 参数'file_name'定义了要创建的文件的名称。它对于识别文件和确保其唯一性很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- file_extension
    - 参数'file_extension'确定要保存的文件的格式。它可以是'txt'或'csv'，影响文本数据在文件中的结构。
    - Comfy dtype: COMBO['txt', 'csv']
    - Python dtype: str

# Output types
- show_help
    - 输出'show_help'提供了一个URL链接到文档，以获取有关使用该节点的进一步帮助或指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SaveTextToFile:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'multiline_text': ('STRING', {'multiline': True, 'default': ''}), 'output_file_path': ('STRING', {'multiline': False, 'default': ''}), 'file_name': ('STRING', {'multiline': False, 'default': ''}), 'file_extension': (['txt', 'csv'],)}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('show_help',)
    OUTPUT_NODE = True
    FUNCTION = 'save_list'
    CATEGORY = icons.get('Comfyroll/Utils/Text')

    def save_list(self, multiline_text, output_file_path, file_name, file_extension):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-save-text-to-file'
        filepath = output_file_path + '\\' + file_name + '.' + file_extension
        index = 1
        if output_file_path == '' or file_name == '':
            print(f'[Warning] CR Save Text List. No file details found. No file output.')
            return ()
        while os.path.exists(filepath):
            if os.path.exists(filepath):
                filepath = output_file_path + '\\' + file_name + '_' + str(index) + '.' + file_extension
                index = index + 1
            else:
                break
        print(f'[Info] CR Save Text List: Saving to {filepath}')
        if file_extension == 'csv':
            text_list = []
            for i in multiline_text.split('\n'):
                text_list.append(i.strip())
            with open(filepath, 'w', newline='') as csv_file:
                csv_writer = csv.writer(csv_file)
                for line in text_list:
                    csv_writer.writerow([line])
        else:
            with open(filepath, 'w', newline='') as text_file:
                for line in multiline_text:
                    text_file.write(line)
        return (show_help,)
```