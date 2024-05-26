# Documentation
- Class name: FaceParsingResultsParser
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

该节点类封装了解析和解释面部解析结果的逻辑，能够从输入数据中提取各种面部属性。它是面部分析任务流程中的核心组件，专注于不同面部特征的分割和识别。

# Input types
## Required
- result
    - 结果参数至关重要，因为它包含了节点将要处理的原始面部解析数据。它是主要的输入，决定了后续操作和面部特征提取的准确性。
    - Comfy dtype: FACE_PARSING_RESULT
    - Python dtype: torch.Tensor
## Optional
- background
    - 该参数控制是否在解析过程中考虑背景分割。包含或排除背景可以显著影响整体面部掩码的组成和面部特征的清晰度。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- skin
    - 皮肤参数对于识别面部区域的皮肤区域至关重要。它在隔离皮肤以进行进一步分析或处理（如皮肤状况评估）中发挥着至关重要的作用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- nose
    - 通过启用或禁用鼻子参数，节点可以专注于鼻子区域，这对于基于特征的面部识别或美颜效果非常重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- eye_g
    - eye_g参数用于包含或排除一般眼睛区域，这对于像目光追踪或眼镜推荐这样的任务很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- r_eye
    - r_eye参数允许特定地包含或排除右眼，这对于详细的面部表情分析或不对称检测至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- l_eye
    - 同样地，l_eye参数用于特定地包含或排除左眼，在面部分析中扮演与右眼参数相似的角色。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- r_brow
    - r_brow参数用于右眉区域，这对于理解面部表情和情感分析很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- l_brow
    - l_brow参数对应左眉区域，在传达面部表情和情感方面与右眉发挥类似作用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- r_ear
    - r_ear参数用于右耳区域，对于一些音视频应用或助听器集成可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- l_ear
    - l_ear参数对应左耳区域，在音视频应用中扮演与右耳相似的角色。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mouth
    - 嘴巴参数对于识别嘴巴区域至关重要，这对于像读唇或语音识别这样的任务非常重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- u_lip
    - u_lip参数专注于上唇区域，这对于详细的面部表情分析和美容相关应用很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- l_lip
    - l_lip参数用于下唇区域，在面部表情分析中扮演与上唇相似的角色。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- hair
    - 头发参数用于包含或排除头发区域，这对于风格分析或头发相关产品推荐可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- hat
    - 帽子参数允许特定地包含或排除帽子区域，这对于时尚分析或配饰推荐很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- ear_r
    - ear_r参数用于右耳区域，对于助听器集成或耳部健康监测可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- neck_l
    - neck_l参数对应左颈部区域，在姿势分析或服装适配推荐中可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- neck
    - 脖子参数用于颈部区域，在姿势分析等任务中很重要，有助于整体身体语言的解释。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- cloth
    - 衣服参数用于包含或排除服装区域，这对于时尚分析或虚拟试衣很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- MASK
    - 输出掩码是一个二进制表示，根据输入参数分割和识别各种面部特征。它是进一步面部分析的关键输出，可用于多种应用，如面部表情识别、美容分析等。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class FaceParsingResultsParser:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'result': ('FACE_PARSING_RESULT', {}), 'background': ('BOOLEAN', {'default': False}), 'skin': ('BOOLEAN', {'default': True}), 'nose': ('BOOLEAN', {'default': True}), 'eye_g': ('BOOLEAN', {'default': True}), 'r_eye': ('BOOLEAN', {'default': True}), 'l_eye': ('BOOLEAN', {'default': True}), 'r_brow': ('BOOLEAN', {'default': True}), 'l_brow': ('BOOLEAN', {'default': True}), 'r_ear': ('BOOLEAN', {'default': True}), 'l_ear': ('BOOLEAN', {'default': True}), 'mouth': ('BOOLEAN', {'default': True}), 'u_lip': ('BOOLEAN', {'default': True}), 'l_lip': ('BOOLEAN', {'default': True}), 'hair': ('BOOLEAN', {'default': True}), 'hat': ('BOOLEAN', {'default': True}), 'ear_r': ('BOOLEAN', {'default': True}), 'neck_l': ('BOOLEAN', {'default': True}), 'neck': ('BOOLEAN', {'default': True}), 'cloth': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, result: Tensor, background: bool, skin: bool, nose: bool, eye_g: bool, r_eye: bool, l_eye: bool, r_brow: bool, l_brow: bool, r_ear: bool, l_ear: bool, mouth: bool, u_lip: bool, l_lip: bool, hair: bool, hat: bool, ear_r: bool, neck_l: bool, neck: bool, cloth: bool):
        masks = []
        for item in result:
            mask = torch.zeros(item.shape, dtype=torch.uint8)
            if background:
                mask = mask | torch.where(item == 0, 1, 0)
            if skin:
                mask = mask | torch.where(item == 1, 1, 0)
            if nose:
                mask = mask | torch.where(item == 2, 1, 0)
            if eye_g:
                mask = mask | torch.where(item == 3, 1, 0)
            if r_eye:
                mask = mask | torch.where(item == 4, 1, 0)
            if l_eye:
                mask = mask | torch.where(item == 5, 1, 0)
            if r_brow:
                mask = mask | torch.where(item == 6, 1, 0)
            if l_brow:
                mask = mask | torch.where(item == 7, 1, 0)
            if r_ear:
                mask = mask | torch.where(item == 8, 1, 0)
            if l_ear:
                mask = mask | torch.where(item == 9, 1, 0)
            if mouth:
                mask = mask | torch.where(item == 10, 1, 0)
            if u_lip:
                mask = mask | torch.where(item == 11, 1, 0)
            if l_lip:
                mask = mask | torch.where(item == 12, 1, 0)
            if hair:
                mask = mask | torch.where(item == 13, 1, 0)
            if hat:
                mask = mask | torch.where(item == 14, 1, 0)
            if ear_r:
                mask = mask | torch.where(item == 15, 1, 0)
            if neck_l:
                mask = mask | torch.where(item == 16, 1, 0)
            if neck:
                mask = mask | torch.where(item == 17, 1, 0)
            if cloth:
                mask = mask | torch.where(item == 18, 1, 0)
            masks.append(mask.float())
        final = torch.cat(masks, dim=0).unsqueeze(0)
        return (final,)
```