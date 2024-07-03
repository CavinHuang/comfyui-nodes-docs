
# Documentation
- Class name: SaltRGBAFromMask
- Category: SALT/Image/Composite
- Output node: False

该节点旨在将遮罩转换为RGBA图像,为结果图像添加透明度。它主要处理图像遮罩以生成具有alpha通道的图像,从而基于输入遮罩创建某些区域透明的图像。

# Input types
## Required
- image
    - 源图像,将与遮罩结合生成RGBA图像。图像的非遮罩区域将保持可见,而遮罩区域可以变为透明或半透明。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- mask
    - 用于生成RGBA图像的输入遮罩。该遮罩决定了结果图像中哪些区域将是透明或不透明的。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image
- threshold
    - 用于确定遮罩中被视为透明的临界点。遮罩中高于此值的像素将更不透明。
    - Comfy dtype: FLOAT
    - Python dtype: float
- invert_mask
    - 布尔值,指示是否在将遮罩应用于图像之前对其进行反转。反转遮罩会交换被视为透明和不透明的区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- rgba_image
    - 应用输入遮罩定义透明区域后得到的RGBA图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltRGBAFromMask:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
                "threshold": ("FLOAT", {"min": 0, "max": 1.0, "step": 0.01, "default": 0.5}),
                "invert_mask": ("BOOLEAN", {"default": False})
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("rgba_image",)

    FUNCTION = "composite"
    CATEGORY = "SALT/Image/Composite"

    def composite(self, image, mask, threshold, invert_mask):
        img = tensor2pil(image)
        msk = mask2pil(mask)

        msk = msk.convert("L")
        img = img.convert("RGBA")

        img_ratio = img.size[0] / img.size[1]
        msk_ratio = msk.size[0] / msk.size[1]

        if img_ratio > msk_ratio:
            scale_factor = img.size[1] / msk.size[1]
            new_size = (int(msk.size[0] * scale_factor), img.size[1])
        else:
            scale_factor = img.size[0] / msk.size[0]
            new_size = (img.size[0], int(msk.size[1] * scale_factor))

        msk = msk.resize(new_size, Image.Resampling.BILINEAR)

        pad_mask = Image.new("L", img.size, 0)

        x = (img.size[0] - msk.size[0]) // 2
        y = (img.size[1] - msk.size[1]) // 2
        pad_mask.paste(msk, (x, y))

        thresh = int(threshold * 255)
        pad_mask = pad_mask.point(lambda p: 255 if p > thresh else 0)

        if invert_mask:
            pad_mask = ImageOps.invert(pad_mask)

        rgba_image = Image.new("RGBA", img.size, (0, 0, 0, 0))
        rgba_image.paste(img, (0, 0), pad_mask)

        return (pil2tensor(rgba_image),)

```
