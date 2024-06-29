# Documentation
- Class name: WAS_CLIPSeg
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

CLIPSeg_image 方法旨在使用文本提示执行图像分割。它利用 CLIPSeg 模型生成一个掩码，该掩码隔离了文本描述的图像中的主体。此方法对于需要基于文本描述进行精确对象分割的应用场景特别有用。

# Input types
## Required
- image
    - 图像参数对于分割过程至关重要，因为它是模型将分析的输入，以识别和隔离所需的主体。图像的质量和分辨率可以显著影响生成的掩码的准确性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- text
    - 文本参数提供了一个描述，指导分割过程。它是可选的，但可以通过指定模型应在图像中关注的内容来提高分割的精度。
    - Comfy dtype: STRING
    - Python dtype: str
- clipseg_model
    - clipseg_model 参数允许用户为分割提供预训练的 CLIPSeg 模型。这对于使用已针对特定任务或数据集进行了微调的自定义模型可能是有益的。
    - Comfy dtype: CLIPSEG_MODEL
    - Python dtype: Tuple[str, transformers.CLIPSegForImageSegmentation]

# Output types
- MASK
    - MASK 输出是一个二进制掩码，根据提供的文本描述将分割的主体与图像的其余部分分开。它对于需要对象分离或背景移除的应用场景至关重要。
    - Comfy dtype: MASK
    - Python dtype: np.ndarray
- MASK_IMAGE
    - MASK_IMAGE 输出是一个被掩码突出显示的分割主体的反转图像。它可以用于视觉验证或需要分割的图像表示的进一步处理步骤。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_CLIPSeg:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'text': ('STRING', {'default': '', 'multiline': False})}, 'optional': {'clipseg_model': ('CLIPSEG_MODEL',)}}
    RETURN_TYPES = ('MASK', 'IMAGE')
    RETURN_NAMES = ('MASK', 'MASK_IMAGE')
    FUNCTION = 'CLIPSeg_image'
    CATEGORY = 'WAS Suite/Image/Masking'

    def CLIPSeg_image(self, image, text=None, clipseg_model=None):
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation
        image = tensor2pil(image)
        cache = os.path.join(MODELS_DIR, 'clipseg')
        if clipseg_model:
            inputs = clipseg_model[0]
            model = clipseg_model[1]
        else:
            inputs = CLIPSegProcessor.from_pretrained('CIDAS/clipseg-rd64-refined', cache_dir=cache)
            model = CLIPSegForImageSegmentation.from_pretrained('CIDAS/clipseg-rd64-refined', cache_dir=cache)
        with torch.no_grad():
            result = model(**inputs(text=text, images=image, padding=True, return_tensors='pt'))
        tensor = torch.sigmoid(result[0])
        mask = 1.0 - (tensor - tensor.min()) / tensor.max()
        mask = mask.unsqueeze(0)
        mask = tensor2pil(mask).convert('L')
        mask = mask.resize(image.size)
        return (pil2mask(mask), pil2tensor(ImageOps.invert(mask.convert('RGB'))))
```