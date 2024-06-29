---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Porter-Duff Image Composite
## Documentation
- Class name: `PorterDuffImageComposite`
- Category: `mask/compositing`
- Output node: `False`

The PorterDuffImageComposite node is designed to perform image compositing using the Porter-Duff compositing operators. It allows for the combination of source and destination images according to various blending modes, enabling the creation of complex visual effects by manipulating image transparency and overlaying images in creative ways.
## Input types
### Required
- **`source`**
    - The source image tensor to be composited over the destination image. It plays a crucial role in determining the final visual outcome based on the selected compositing mode.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`source_alpha`**
    - The alpha channel of the source image, which specifies the transparency of each pixel in the source image. It affects how the source image blends with the destination image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`destination`**
    - The destination image tensor that serves as the backdrop over which the source image is composited. It contributes to the final composited image based on the blending mode.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`destination_alpha`**
    - The alpha channel of the destination image, defining the transparency of the destination image's pixels. It influences the blending of the source and destination images.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - The Porter-Duff compositing mode to apply, which determines how the source and destination images are blended together. Each mode creates different visual effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `PorterDuffMode`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The composited image resulting from the application of the specified Porter-Duff mode.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The alpha channel of the composited image, indicating the transparency of each pixel.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PorterDuffImageComposite](../../Comfy/Nodes/PorterDuffImageComposite.md)



## Source code
```python
class PorterDuffImageComposite:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "source": ("IMAGE",),
                "source_alpha": ("MASK",),
                "destination": ("IMAGE",),
                "destination_alpha": ("MASK",),
                "mode": ([mode.name for mode in PorterDuffMode], {"default": PorterDuffMode.DST.name}),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "composite"
    CATEGORY = "mask/compositing"

    def composite(self, source: torch.Tensor, source_alpha: torch.Tensor, destination: torch.Tensor, destination_alpha: torch.Tensor, mode):
        batch_size = min(len(source), len(source_alpha), len(destination), len(destination_alpha))
        out_images = []
        out_alphas = []

        for i in range(batch_size):
            src_image = source[i]
            dst_image = destination[i]

            assert src_image.shape[2] == dst_image.shape[2] # inputs need to have same number of channels

            src_alpha = source_alpha[i].unsqueeze(2)
            dst_alpha = destination_alpha[i].unsqueeze(2)

            if dst_alpha.shape[:2] != dst_image.shape[:2]:
                upscale_input = dst_alpha.unsqueeze(0).permute(0, 3, 1, 2)
                upscale_output = comfy.utils.common_upscale(upscale_input, dst_image.shape[1], dst_image.shape[0], upscale_method='bicubic', crop='center')
                dst_alpha = upscale_output.permute(0, 2, 3, 1).squeeze(0)
            if src_image.shape != dst_image.shape:
                upscale_input = src_image.unsqueeze(0).permute(0, 3, 1, 2)
                upscale_output = comfy.utils.common_upscale(upscale_input, dst_image.shape[1], dst_image.shape[0], upscale_method='bicubic', crop='center')
                src_image = upscale_output.permute(0, 2, 3, 1).squeeze(0)
            if src_alpha.shape != dst_alpha.shape:
                upscale_input = src_alpha.unsqueeze(0).permute(0, 3, 1, 2)
                upscale_output = comfy.utils.common_upscale(upscale_input, dst_alpha.shape[1], dst_alpha.shape[0], upscale_method='bicubic', crop='center')
                src_alpha = upscale_output.permute(0, 2, 3, 1).squeeze(0)

            out_image, out_alpha = porter_duff_composite(src_image, src_alpha, dst_image, dst_alpha, PorterDuffMode[mode])

            out_images.append(out_image)
            out_alphas.append(out_alpha.squeeze(2))

        result = (torch.stack(out_images), torch.stack(out_alphas))
        return result

```
