# Documentation
- Class name: AppInfo
- Category: ♾️Mixlab
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

AppInfo是一个旨在管理和组织应用程序信息的节点，它便于在系统中设置和运行各种应用程序。它简化了应用程序细节的输入和输出，确保高效处理应用程序数据。该节点在概念上专注于提供结构化的应用程序信息管理方法，而不绑定于具体的实现细节。

# Input types
## Required
- name
    - 名称参数对于在系统中识别应用程序至关重要。它作为一个唯一标识符，有助于组织和检索与应用程序相关的数据。名称影响应用程序在系统中的引用和管理方式。
    - Comfy dtype: STRING
    - Python dtype: str
- input_ids
    - 输入ID在跟踪应用程序的组成部分或模块中起着关键作用。它们对于系统性地分析和管理应用程序的结构至关重要，确保每个部分都被记录并可以根据需要访问。
    - Comfy dtype: STRING
    - Python dtype: str
- output_ids
    - 输出ID对于映射应用程序的结果和成果至关重要。它们定义了输出数据的结构和格式，使得应用程序的输出能够被有效监控和利用。正确管理输出ID对于应用程序的成功运行和与其他系统组件的集成至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- IMAGE
    - 图像提供了应用程序的视觉表现，增强了理解和沟通。它们可以用于显示应用程序的界面、图标或其他视觉元素，这对于用户交互和品牌塑造非常重要。包含图像可以显著改善用户体验和对应用程序的感知。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- description
    - 描述参数对于提供应用程序的上下文和背景信息至关重要。它有助于传达应用程序的目的、特点和使用场景，对用户和开发者都有益。清晰简洁的描述可以极大地帮助应用程序的文档编写和推广。
    - Comfy dtype: STRING
    - Python dtype: str
- version
    - 版本参数对于跟踪应用程序的发展和更新至关重要。它有助于记录变化和改进，从而更好地管理应用程序的开发周期。版本号是用户和开发者在解决问题或规划新功能时的关键参考点。
    - Comfy dtype: INT
    - Python dtype: int
- share_prefix
    - 共享前缀对于定义应用程序的数据和资源如何共享和访问非常重要。它为系统内的数据交换和协作奠定了基础，确保应用程序的共享机制与整体系统架构保持一致。
    - Comfy dtype: STRING
    - Python dtype: str
- link
    - 链接参数对于引导用户获取与应用程序相关的额外资源或内容非常重要。它可以提供对文档、支持或补充材料的访问，这对于增强用户对应用程序的理解和参与非常有价值。
    - Comfy dtype: STRING
    - Python dtype: str
- category
    - 类别参数有助于将应用程序归类到特定的领域或类型中，这对于组织和导航非常有用。它有助于将相似的应用程序分组在一起，使用户更容易找到并选择适合他们需求的应用程序。
    - Comfy dtype: STRING
    - Python dtype: str
- auto_save
    - 自动保存参数对于确定应用程序的数据持久性和恢复行为非常重要。它决定了应用程序的状态是否应该在固定时间间隔自动保存，确保用户在中断或系统故障的情况下可以恢复他们的工作。
    - Comfy dtype: COMBO['enable', 'disable']
    - Python dtype: str

# Output types
- ui.json
    - ui.json输出是应用程序信息的结构化表示，包括其名称、图像和各种ID。它作为一个全面的摘要，可以用于系统的进一步处理或显示。这个输出对于将应用程序的数据与其他组件集成以及提供应用程序状态的清晰概览非常重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class AppInfo:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'name': ('STRING', {'multiline': False, 'default': 'Mixlab-App', 'dynamicPrompts': False}), 'input_ids': ('STRING', {'multiline': True, 'default': '\n'.join(['1', '2', '3']), 'dynamicPrompts': False}), 'output_ids': ('STRING', {'multiline': True, 'default': '\n'.join(['5', '9']), 'dynamicPrompts': False})}, 'optional': {'IMAGE': ('IMAGE',), 'description': ('STRING', {'multiline': True, 'default': '', 'dynamicPrompts': False}), 'version': ('INT', {'default': 1, 'min': 1, 'max': 10000, 'step': 1, 'display': 'number'}), 'share_prefix': ('STRING', {'multiline': False, 'default': '', 'dynamicPrompts': False}), 'link': ('STRING', {'multiline': False, 'default': 'https://', 'dynamicPrompts': False}), 'category': ('STRING', {'multiline': False, 'default': '', 'dynamicPrompts': False}), 'auto_save': (['enable', 'disable'],)}}
    RETURN_TYPES = ()
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab'
    OUTPUT_NODE = True
    INPUT_IS_LIST = True

    def run(self, name, input_ids, output_ids, IMAGE, description, version, share_prefix, link, category, auto_save):
        name = name[0]
        im = None
        if IMAGE:
            im = IMAGE[0][0]
            im = create_temp_file(im)
        input_ids = input_ids[0]
        output_ids = output_ids[0]
        description = description[0]
        version = version[0]
        share_prefix = share_prefix[0]
        link = link[0]
        category = category[0]
        return {'ui': {'json': [name, im, input_ids, output_ids, description, version, share_prefix, link, category]}, 'result': ()}
```