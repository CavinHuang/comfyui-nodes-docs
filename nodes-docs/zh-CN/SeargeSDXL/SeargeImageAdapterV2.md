# Documentation
- Class name: SeargeImageAdapterV2
- Category: UI_PROMPTING
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeImageAdapterV2 类旨在促进图像数据的转换和适配，以用于用户界面提示目的。它在将源图像、图像掩码和上传的掩码整合到 UI 组件可以有效利用的结构化数据流中起着关键作用。

# Input types
## Required
- source_image
    - source_image 参数对于节点的操作至关重要，因为它表示需要处理的原始图像数据。它显著影响节点如何转换和构建数据以供下游任务使用。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, bytes, io.BufferedReader]
- image_mask
    - image_mask 参数是一个可选输入，它定义了要应用于源图像的掩码。它对节点很重要，因为它决定了将被处理或突出显示的图像区域。
    - Comfy dtype: MASK
    - Python dtype: Union[str, bytes, io.BufferedReader]
- uploaded_mask
    - uploaded_mask 参数允许在图像处理流水线中包含用户上传的掩码。它的存在可以通过为图像操作提供额外的上下文来改变节点的行为。
    - Comfy dtype: MASK
    - Python dtype: Union[str, bytes, io.BufferedReader]
- data
    - data 参数用作可能需要用于节点操作的额外数据的容器。它是可选的，并且可以用来向节点传递补充信息。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Output types
- data
    - data 输出是一个结构化的数据流，封装了处理后的图像和掩码信息。它很重要，因为它为后续的 UI 组件或下游处理阶段提供了必要的输入。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]
- S_IMAGE_INPUTS
    - S_IMAGE_INPUTS 输出包含已适配用于 UI 提示的图像输入。它对于用户界面内的正确显示和交互至关重要。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeImageAdapterV2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'data': ('SRG_DATA_STREAM',), 'source_image': ('IMAGE',), 'image_mask': ('MASK',), 'uploaded_mask': ('MASK',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM', 'SRG_DATA_STREAM')
    RETURN_NAMES = ('data', UI.S_IMAGE_INPUTS)
    FUNCTION = 'get_value'
    CATEGORY = UI.CATEGORY_UI_PROMPTING

    @staticmethod
    def create_dict(source_image, image_mask, uploaded_mask):
        return {UI.F_SOURCE_IMAGE_CHANGED: True, UI.F_SOURCE_IMAGE: source_image, UI.F_IMAGE_MASK_CHANGED: True, UI.F_IMAGE_MASK: image_mask, UI.F_UPLOADED_MASK_CHANGED: True, UI.F_UPLOADED_MASK: uploaded_mask}

    def get_value(self, source_image=None, image_mask=None, uploaded_mask=None, data=None):
        if data is None:
            data = {}
        data[UI.S_IMAGE_INPUTS] = self.create_dict(source_image, image_mask, uploaded_mask)
        return (data, data[UI.S_IMAGE_INPUTS])
```