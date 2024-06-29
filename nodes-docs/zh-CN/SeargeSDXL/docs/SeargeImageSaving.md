# Documentation
- Class name: SeargeImageSaving
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点协调由过程生成的图像的保存，允许定制与保存不同分辨率的图像相关的参数，并可选择性地嵌入工作流。

# Input types
## Required
- save_parameters_file
    - 该参数决定是否应保存图像保存参数，这对于保留用于图像生成的设置至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- save_folder
    - 生成图像的保存目标文件夹，对于组织和访问图像生成过程的输出至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- save_generated_image
    - 决定是否保存最初生成的图像，影响图像生成过程的主要输出的保存和可用性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- embed_workflow_in_generated
    - 这控制工作流信息是否包含在生成的图像中，增强了图像创建过程的上下文和可追溯性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- generated_image_name
    - 指定生成图像的文件名，这对于在系统中识别和引用输出非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- save_high_res_image
    - 指示是否应保存图像的高分辨率版本，影响保存图像的质量及其进一步使用的实用性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- embed_workflow_in_high_res
    - 决定高分辨率图像是否应包含嵌入的工作流信息，这对于保持图像创建的完整性和上下文非常重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- high_res_image_name
    - 定义高分辨率图像的文件名，确保输出在系统中易于区分和访问。
    - Comfy dtype: STRING
    - Python dtype: str
- save_upscaled_image
    - 控制是否保存图像的放大版本，这对于需要更大尺寸而不失细节的应用非常重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- embed_workflow_in_upscaled
    - 这指定放大图像是否应包括工作流信息，确保缩放过程有记录且可追溯。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- upscaled_image_name
    - 设置放大图像的文件名，这对于在系统中管理和引用增强分辨率的输出至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- data
    - 该参数作为图像保存过程中可能需要的额外数据的容器，确保在各种场景中的灵活性和适应性。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Any

# Output types
- data
    - 输出包含了配置的图像保存参数，提供了一个结构化的格式，这对于下游过程按预期执行图像保存至关重要。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeImageSaving:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'save_parameters_file': ('BOOLEAN', {'default': True}), 'save_folder': (UI.SAVE_FOLDERS, {'default': UI.SAVE_TO_OUTPUT_DATE}), 'save_generated_image': ('BOOLEAN', {'default': True}), 'embed_workflow_in_generated': ('BOOLEAN', {'default': True}), 'generated_image_name': ('STRING', {'multiline': False, 'default': 'generated'}), 'save_high_res_image': ('BOOLEAN', {'default': True}), 'embed_workflow_in_high_res': ('BOOLEAN', {'default': True}), 'high_res_image_name': ('STRING', {'multiline': False, 'default': 'high-res'}), 'save_upscaled_image': ('BOOLEAN', {'default': True}), 'embed_workflow_in_upscaled': ('BOOLEAN', {'default': True}), 'upscaled_image_name': ('STRING', {'multiline': False, 'default': 'upscaled'})}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(save_parameters_file, save_folder, save_generated_image, embed_workflow_in_generated, generated_image_name, save_high_res_image, embed_workflow_in_high_res, high_res_image_name, save_upscaled_image, embed_workflow_in_upscaled, upscaled_image_name):
        return {UI.F_SAVE_PARAMETERS_FILE: save_parameters_file is not None and save_parameters_file, UI.F_SAVE_FOLDER: save_folder, UI.F_SAVE_GENERATED_IMAGE: save_generated_image is not None and save_generated_image, UI.F_EMBED_WORKFLOW_IN_GENERATED: embed_workflow_in_generated is not None and embed_workflow_in_generated, UI.F_GENERATED_IMAGE_NAME: generated_image_name, UI.F_SAVE_HIGH_RES_IMAGE: save_high_res_image is not None and save_high_res_image, UI.F_EMBED_WORKFLOW_IN_HIGH_RES: embed_workflow_in_high_res is not None and embed_workflow_in_high_res, UI.F_HIGH_RES_IMAGE_NAME: high_res_image_name, UI.F_SAVE_UPSCALED_IMAGE: save_upscaled_image is not None and save_upscaled_image, UI.F_EMBED_WORKFLOW_IN_UPSCALED: embed_workflow_in_upscaled is not None and embed_workflow_in_upscaled, UI.F_UPSCALED_IMAGE_NAME: upscaled_image_name}

    def get(self, save_parameters_file, save_folder, save_generated_image, embed_workflow_in_generated, generated_image_name, save_high_res_image, embed_workflow_in_high_res, high_res_image_name, save_upscaled_image, embed_workflow_in_upscaled, upscaled_image_name, data=None):
        if data is None:
            data = {}
        data[UI.S_IMAGE_SAVING] = self.create_dict(save_parameters_file, save_folder, save_generated_image, embed_workflow_in_generated, generated_image_name, save_high_res_image, embed_workflow_in_high_res, high_res_image_name, save_upscaled_image, embed_workflow_in_upscaled, upscaled_image_name)
        return (data,)
```