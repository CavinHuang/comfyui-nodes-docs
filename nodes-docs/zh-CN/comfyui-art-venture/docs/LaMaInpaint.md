
# Documentation
- Class name: LaMaInpaint
- Category: Art Venture/Inpainting
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LaMaInpaint节点专门用于对象移除和图像修复任务。它利用深度学习模型为图像中缺失或不需要的区域填充合理的纹理和细节。该节点处理输入的图像及其对应的遮罩，生成修复后的图像，将修复区域与原始图像内容无缝融合。

# Input types
## Required
- image
    - 需要进行修复的输入图像张量。它代表了标记了某些区域需要移除或恢复的视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 指示需要修复区域的遮罩张量。遮罩中非零值的像素被视为需要修复的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- device_mode
    - 指定执行修复操作的设备（CPU或GPU），允许灵活利用计算资源。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 包含修复后图像的输出张量，其中指定的区域已被生成的、与周围区域匹配的内容填充。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LaMaInpaint:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
            },
            "optional": {"device_mode": (["AUTO", "Prefer GPU", "CPU"],)},
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Inpainting"
    FUNCTION = "lama_inpaint"

    def lama_inpaint(
        self,
        image: torch.Tensor,
        mask: torch.Tensor,
        device_mode="AUTO",
    ):
        if image.shape[0] != mask.shape[0]:
            raise Exception("Image and mask must have the same batch size")

        device = gpu if device_mode != "CPU" else cpu

        model = load_model()
        model.to(device)

        try:
            inpainted = []
            orig_w = image.shape[2]
            orig_h = image.shape[1]

            for i, img in enumerate(image):
                img = img.permute(2, 0, 1).unsqueeze(0)
                msk = mask[i].detach().cpu()
                msk = (msk > 0) * 1.0
                msk = msk.unsqueeze(0).unsqueeze(0)

                batch = {}
                batch["image"] = pad_tensor_to_modulo(img, 8).to(device)
                batch["mask"] = pad_tensor_to_modulo(msk, 8).to(device)

                res = model(batch)
                res = batch["inpainted"][0].permute(1, 2, 0)
                res = res.detach().cpu()
                res = res[:orig_h, :orig_w]

                inpainted.append(res)

            return (torch.stack(inpainted),)
        finally:
            if device_mode == "AUTO":
                model.to(cpu)

```
