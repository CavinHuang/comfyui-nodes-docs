# Documentation
- Class name: RemBgUltra
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

去除背景。与类似的背景移除节点相比，这个节点具有超高的边缘细节。 本节点结合了spacepxl的[ComfyUI-Image-Filters](https://github.com/spacepxl/ComfyUI-Image-Filters)的Alpha Matte节点，以及ZHO-ZHO-ZHO的[ComfyUI-BRIA_AI-RMBG](https://github.com/ZHO-ZHO-ZHO/ComfyUI-BRIA_AI-RMBG)的功能，感谢原作者。

*将[BRIA Background Removal v1.4](https://huggingface.co/briaai/RMBG-1.4)模型文件(model.pth)下载至ComfyUI/models/rmbg/RMBG-1.4文件夹。该模型由 BRIA AI 开发，可作为非商业用途的开源模型。

# Input types

## Required

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- detail_range
    - 边缘细节范围。
    - Comfy dtype: INT
    - Python dtype: int

- black_point
    - 边缘黑色采样阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- white_point
    - 边缘白色采样阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- process_detail
    - 此处设为False将跳过边缘处理以节省运行时间。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool


# Output types

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class RemBgUltra:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):

        return {
            "required": {
                "image": ("IMAGE",),
                "detail_range": ("INT", {"default": 8, "min": 1, "max": 256, "step": 1}),
                "black_point": ("FLOAT", {"default": 0.01, "min": 0.01, "max": 0.98, "step": 0.01}),
                "white_point": ("FLOAT", {"default": 0.99, "min": 0.02, "max": 0.99, "step": 0.01}),
                "process_detail": ("BOOLEAN", {"default": True}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", )
    RETURN_NAMES = ("image", "mask", )
    FUNCTION = "rembg_ultra"
    CATEGORY = '😺dzNodes/LayerMask'

    def rembg_ultra(self, image, detail_range, black_point, white_point, process_detail):
        ret_images = []
        ret_masks = []

        for i in image:
            i = torch.unsqueeze(i, 0)
            i = pil2tensor(tensor2pil(i).convert('RGB'))
            orig_image = tensor2pil(i).convert('RGB')
            _mask = RMBG(orig_image)
            if process_detail:
                _mask = tensor2pil(mask_edge_detail(i, pil2tensor(_mask), detail_range, black_point, white_point))
            ret_image = RGB2RGBA(orig_image, _mask.convert('L'))
            ret_images.append(pil2tensor(ret_image))
            ret_masks.append(image2mask(_mask))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0),)