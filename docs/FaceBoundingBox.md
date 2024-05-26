# Documentation
- Class name: FaceBoundingBox
- Category: FaceAnalysis
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_FaceAnalysis.git

该节点旨在分析图像并检测面部边界框，在需要面部检测和分析的图像处理应用中提供关键功能。

# Input types
## Required
- analysis_models
    - 此参数包含用于图像中面部检测的模型和库，对节点处理和分析输入数据的能力有重大影响。
    - Comfy dtype: DICT[str, Any]
    - Python dtype: Dict[str, Any]
- image
    - 图像参数对节点的运行至关重要，因为它是面部边界框检测的主要输入，直接影响分析的准确性和有效性。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- padding
    - 填充是一个重要的参数，它确保检测到的面部有足够的边界，防止切割问题，提高检测的整体质量。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- index
    - 索引参数允许从多个检测中选择特定的面部，将节点的输出集中在所需的面部边界框上。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 输出图像张量代表检测到的面部的裁剪和处理后的图像，对于进一步分析或显示目的来说是一个重要组成部分。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- x
    - 边界框左上角的x坐标提供了面部检测的参考点，有助于精确定位图像中的面部。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - 边界框左上角的y坐标对于在图像上下文中准确定位检测到的面部至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 边界框的宽度很重要，因为它决定了检测到的面部的大小，影响输出的分辨率和细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 边界框的高度对于保持检测到的面部的宽高比和比例至关重要，确保输出中面部特征的完整性。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class FaceBoundingBox:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'analysis_models': ('ANALYSIS_MODELS',), 'image': ('IMAGE',), 'padding': ('INT', {'default': 0, 'min': 0, 'max': 4096, 'step': 1}), 'index': ('INT', {'default': -1, 'min': -1, 'max': 4096, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('IMAGE', 'x', 'y', 'width', 'height')
    FUNCTION = 'bbox'
    CATEGORY = 'FaceAnalysis'

    def bbox(self, analysis_models, image, padding, index=-1):
        out_img = []
        out_x = []
        out_y = []
        out_w = []
        out_h = []
        for i in image:
            img = T.ToPILImage()(i.permute(2, 0, 1)).convert('RGB')
            if analysis_models['library'] == 'insightface':
                faces = analysis_models['detector'].get(np.array(img))
                for face in faces:
                    (x, y, w, h) = face.bbox.astype(int)
                    w = w - x
                    h = h - y
                    x = max(0, x - padding)
                    y = max(0, y - padding)
                    w = min(img.width, w + 2 * padding)
                    h = min(img.height, h + 2 * padding)
                    crop = img.crop((x, y, x + w, y + h))
                    out_img.append(T.ToTensor()(crop).permute(1, 2, 0))
                    out_x.append(x)
                    out_y.append(y)
                    out_w.append(w)
                    out_h.append(h)
            else:
                faces = analysis_models['detector'](np.array(img), 1)
                for face in faces:
                    (x, y, w, h) = (face.left(), face.top(), face.width(), face.height())
                    x = max(0, x - padding)
                    y = max(0, y - padding)
                    w = min(img.width, w + 2 * padding)
                    h = min(img.height, h + 2 * padding)
                    crop = img.crop((x, y, x + w, y + h))
                    out_img.append(T.ToTensor()(crop).permute(1, 2, 0))
                    out_x.append(x)
                    out_y.append(y)
                    out_w.append(w)
                    out_h.append(h)
        if not out_img:
            raise Exception('No face detected in image.')
        if len(out_img) == 1:
            index = 0
        if index > len(out_img) - 1:
            index = len(out_img) - 1
        if index != -1:
            out_img = out_img[index].unsqueeze(0)
            out_x = out_x[index]
            out_y = out_y[index]
            out_w = out_w[index]
            out_h = out_h[index]
        else:
            w = out_img[0].shape[1]
            h = out_img[0].shape[0]
            out_img = [comfy.utils.common_upscale(img.unsqueeze(0).movedim(-1, 1), w, h, 'bilinear', 'center').movedim(1, -1).squeeze(0) for img in out_img]
            out_img = torch.stack(out_img)
        return (out_img, out_x, out_y, out_w, out_h)
```