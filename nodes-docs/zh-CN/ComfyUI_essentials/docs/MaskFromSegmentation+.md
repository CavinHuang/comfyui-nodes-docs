
# Documentation
- Class name: MaskFromSegmentation+
- Category: essentials
- Output node: False

MaskFromSegmentation+ 节点旨在基于图像分割生成掩码，通过分割技术识别和隔离特定特征或对象，从而从图像中提取它们。这个过程有助于图像处理和计算机视觉任务中的特征提取和目标识别。

# Input types
## Required
- image
    - 作为分割基础的输入图像，是生成掩码的源数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- segments
    - 指定用于创建掩码的分割部分，允许在图像中进行有针对性的提取。
    - Comfy dtype: INT
    - Python dtype: List[int]
- remove_isolated_pixels
    - 一个布尔标志，用于移除生成掩码中的孤立像素，通过消除噪点来提高掩码质量。
    - Comfy dtype: INT
    - Python dtype: bool
- remove_small_masks
    - 一个布尔标志，用于从生成的掩码中移除小型掩码，通过过滤掉次要部分来聚焦于重要分割。
    - Comfy dtype: FLOAT
    - Python dtype: bool
- fill_holes
    - 一个布尔标志，用于填充生成掩码中的空洞，确保输出更连续和连贯的掩码。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- mask
    - 从指定图像分割生成的输出掩码，用于隔离所需的特征或对象。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskFromSegmentation:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE", ),
                "segments": ("INT", { "default": 6, "min": 1, "max": 16, "step": 1, }),
                "remove_isolated_pixels": ("INT", { "default": 0, "min": 0, "max": 32, "step": 1, }),
                "remove_small_masks": ("FLOAT", { "default": 0.0, "min": 0., "max": 1., "step": 0.01, }),
                "fill_holes": ("BOOLEAN", { "default": False }),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, segments, remove_isolated_pixels, fill_holes, remove_small_masks):
        im = image[0] # we only work on the first image in the batch
        im = Image.fromarray((im * 255).to(torch.uint8).cpu().numpy(), mode="RGB")
        im = im.quantize(palette=im.quantize(colors=segments), dither=Image.Dither.NONE)       
        im = torch.tensor(np.array(im.convert("RGB"))).float() / 255.0

        colors = im.reshape(-1, im.shape[-1])
        colors = torch.unique(colors, dim=0)

        masks = []
        for color in colors:
            mask = (im == color).all(dim=-1).float()
            # remove isolated pixels
            if remove_isolated_pixels > 0:
                mask_np = mask.cpu().numpy()
                mask_np = scipy.ndimage.binary_opening(mask_np, structure=np.ones((remove_isolated_pixels, remove_isolated_pixels)))
                mask = torch.from_numpy(mask_np)

            # fill holes
            if fill_holes:
                mask_np = mask.cpu().numpy()
                mask_np = scipy.ndimage.binary_fill_holes(mask_np)
                mask = torch.from_numpy(mask_np)

            # if the mask is too small, it's probably noise
            if mask.sum() / (mask.shape[0]*mask.shape[1]) > remove_small_masks:
                masks.append(mask)

        if masks == []:
            masks.append(torch.zeros_like(im).squeeze(-1).unsqueeze(0)) # return an empty mask if no masks were found, prevents errors

        mask = torch.stack(masks, dim=0).float()

        return (mask, )

```
