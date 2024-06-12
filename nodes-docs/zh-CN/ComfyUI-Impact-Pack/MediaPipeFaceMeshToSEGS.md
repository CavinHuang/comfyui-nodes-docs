# Documentation
- Class name: MediaPipeFaceMeshToSEGS
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

MediaPipeFaceMeshToSEGS节点旨在处理面部图像并将其转换为结构化的分割格式。它利用MediaPipe FaceMesh模型检测面部标记，然后为指定的每个面部特征生成分割掩码。该节点能够处理各种面部部件，如面部、嘴巴、眼睛、眉毛和瞳孔，允许根据用户的需求进行详细分割。

# Input types
## Required
- image
    - 输入图像是MediaPipeFaceMeshToSEGS节点的一个关键参数，因为它是面部标记检测和随后分割的基础。输入图像的质量和分辨率直接影响面部特征分割的准确性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- crop_factor
    - crop_factor参数用于调整分割输出的大小。它是一个可选设置，允许用户通过调整输出尺寸来控制分割中的细节级别。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_fill
    - bbox_fill参数决定是否应该填充围绕分割面部特征的边界框。这个布尔标志可以用来自定义分割掩码的外观。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- crop_min_size
    - crop_min_size参数指定围绕面部特征的裁剪区域的最小尺寸。它确保分割输出包含了检测到的标记周围的足够上下文。
    - Comfy dtype: INT
    - Python dtype: int
- drop_size
    - drop_size参数用于控制分割点之间的间距。它通过确定点之间的间隔来影响分割掩码的密度。
    - Comfy dtype: INT
    - Python dtype: int
- dilation
    - dilation参数应用于分割掩码以增加分割区域的大小。这对于细化较小面部特征的分割特别有用。
    - Comfy dtype: INT
    - Python dtype: int
- face
    - face参数是一个布尔标志，指示是否应将面部区域包含在分割中。它允许根据用户需求选择性地分割面部特征。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mouth
    - mouth参数是一个布尔标志，它决定分割是否应包括嘴巴区域。它在分割特定面部特征时提供了灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- left_eyebrow
    - left_eyebrow参数用于切换左眉是否包含在分割输出中。它允许选择性地分割个别面部特征。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- left_eye
    - left_eye参数控制左眼区域是否是分割的一部分。它允许根据用户请求分割特定的面部区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- left_pupil
    - left_pupil参数指定分割是否应包括左瞳孔。它用于眼区的详细分割。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- right_eyebrow
    - right_eyebrow参数用于确定右眉是否应包含在分割掩码中。它支持根据请求进行面部特征的分割。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- right_eye
    - right_eye参数指示是否应将右眼区域包含在分割中。它便于根据需要分割特定的面部区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- right_pupil
    - right_pupil参数控制右瞳孔是否包含在分割过程中。这对于眼区的精确分割至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- SEGS
    - SEGS输出提供了面部特征分割的结构化表示。它包括分割掩码的尺寸和包含标签和相应分割掩码张量元组的列表。
    - Comfy dtype: COMBO[str, List[Tuple[int, torch.Tensor]]]
    - Python dtype: Tuple[int, List[Tuple[str, torch.Tensor]]]

# Usage tips
- Infra type: CPU

# Source code
```
class MediaPipeFaceMeshToSEGS:

    @classmethod
    def INPUT_TYPES(s):
        bool_true_widget = ('BOOLEAN', {'default': True, 'label_on': 'Enabled', 'label_off': 'Disabled'})
        bool_false_widget = ('BOOLEAN', {'default': False, 'label_on': 'Enabled', 'label_off': 'Disabled'})
        return {'required': {'image': ('IMAGE',), 'crop_factor': ('FLOAT', {'default': 3.0, 'min': 1.0, 'max': 100, 'step': 0.1}), 'bbox_fill': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'crop_min_size': ('INT', {'min': 10, 'max': MAX_RESOLUTION, 'step': 1, 'default': 50}), 'drop_size': ('INT', {'min': 1, 'max': MAX_RESOLUTION, 'step': 1, 'default': 1}), 'dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'face': bool_true_widget, 'mouth': bool_false_widget, 'left_eyebrow': bool_false_widget, 'left_eye': bool_false_widget, 'left_pupil': bool_false_widget, 'right_eyebrow': bool_false_widget, 'right_eye': bool_false_widget, 'right_pupil': bool_false_widget}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, image, crop_factor, bbox_fill, crop_min_size, drop_size, dilation, face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil):
        result = core.mediapipe_facemesh_to_segs(image, crop_factor, bbox_fill, crop_min_size, drop_size, dilation, face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil)
        return (result,)
```