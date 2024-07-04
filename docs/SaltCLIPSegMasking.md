
# Documentation
- Class name: SaltCLIPSegMasking
- Category: SALT/Masking
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltCLIPSegMasking节点是为批量处理图像设计的，它使用CLIPSeg模型基于文本描述生成分割掩码。该节点结合了图像和文本输入，以生成与给定文本描述相匹配的详细分割掩码，从而促进了高级图像处理和分析任务。

# Input types
## Required
- images
    - 需要进行分割处理的一批图像。这些图像会被转换并调整大小以匹配主图像尺寸，以确保生成一致的掩码。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- text
    - 可选的文本描述，用于指导分割过程。这允许基于文本线索生成目标掩码。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
## Optional
- clipseg_model
    - 可选的预加载CLIPSeg模型和处理器，用于执行分割任务。如果未提供，节点将加载默认模型。
    - Comfy dtype: CLIPSEG_MODEL
    - Python dtype: Optional[Tuple[CLIPSegProcessor, CLIPSegForImageSegmentation]]

# Output types
- masks
    - 与输入图像对应的分割掩码，已调整为主图像尺寸。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_images
    - 分割掩码的RGB表示，用于可视化目的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltCLIPSegMasking:
    def __init__(self):
        pass
        
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "text": ("STRING", {"default":"", "multiline": False}),
            },
            "optional": {
                "clipseg_model": ("CLIPSEG_MODEL",),
            }
        }

    RETURN_TYPES = ("MASK", "IMAGE")
    RETURN_NAMES = ("masks", "mask_images")
    FUNCTION = "CLIPSeg_image"

    CATEGORY = f"{NAME}/Masking"

    def CLIPSeg_image(self, images, text=None, clipseg_model=None):
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation

        masks = []
        image_masks = []
        master_size = None
        
        for image in images:

            image = tensor2pil(image)
            cache = os.path.join(models_dir, 'clipseg')

            if not master_size:
                master_size = image.size

            if clipseg_model:
                inputs = clipseg_model[0]
                model = clipseg_model[1]
            else:
                inputs = CLIPSegProcessor.from_pretrained("CIDAS/clipseg-rd64-refined", cache_dir=cache)
                model = CLIPSegForImageSegmentation.from_pretrained("CIDAS/clipseg-rd64-refined", cache_dir=cache)

            with torch.no_grad():
                result = model(**inputs(text=text, images=image, padding=True, return_tensors="pt"))

            tensor = torch.sigmoid(result[0])
            mask = (tensor - tensor.min()) / tensor.max()
            mask = mask.unsqueeze(0)
            mask = tensor2pil(mask)
            mask = mask.resize(master_size)
            mask_image_tensor = pil2tensor(mask.convert("RGB"))
            mask_tensor = image2mask(mask_image_tensor)
            masks.append(mask_tensor)
            image_masks.append(mask_image_tensor)

        masks = torch.cat(masks, dim=0)
        image_masks = torch.cat(image_masks, dim=0)
                
        return (masks, image_masks)

```
