
# Documentation
- Class name: SAIColorTransfer
- Category: SALT/Image/Process
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SAIColorTransfer节点专门用于在图像之间应用色彩迁移技术，可以将目标图像的调色板修改为与源图像相匹配。这个过程对于协调不同图像之间的色彩或实现特定的美学效果非常有用。

# Input types
## Required
- target_images
    - 指定需要修改调色板的图像。这个输入对于确定输出图像的最终外观至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- source_images
    - 定义提供调色板的图像，这个调色板将被转移到目标图像上。源图像的选择直接影响所应用的色彩转换。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- mode
    - 决定要应用的色彩迁移方法，如PDF重组、均值迁移或LAB色彩空间迁移，影响色彩适应的视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- images
    - 色彩迁移过程后的结果图像，展示了经过调整的调色板。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SAIColorTransfer:
    def __init__(self):
        self.ct = ColorTransfer()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "target_images": ("IMAGE",),
                "source_images": ("IMAGE",),
                "mode": (["pdf_regrain", "mean_transfer", "lab_transfer"],)
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    FUNCTION = "transfer"
    CATEGORY = "SALT/Image/Process"

    def transfer(self, target_images, source_images, mode):

        if target_images.shape[0] != source_images.shape[0]:
            repeat_factor = target_images.shape[0] // source_images.shape[0]
            source_images = source_images.repeat(repeat_factor, 1, 1, 1)

        results = []
        for target_image, source_image in zip(target_images, source_images):

            target_pil = tensor2pil(target_image)
            source_pil = tensor2pil(source_image)
            source_pil = source_pil.resize(target_pil.size)

            if mode == "pdf_regrain":
                res = pil2tensor(cv2pil(self.ct.pdf_transfer(img_arr_in=pil2cv(target_pil), img_arr_ref=pil2cv(source_pil), regrain=True)))
            elif mode == "mean_transfer":
                res = pil2tensor(cv2pil(self.ct.mean_std_transfer(img_arr_in=pil2cv(target_pil), img_arr_ref=pil2cv(source_pil))))
            elif mode == "lab_transfer":
                res = pil2tensor(cv2pil(self.ct.lab_transfer(img_arr_in=pil2cv(target_pil), img_arr_ref=pil2cv(source_pil))))
            else:
                print(f"Invalid mode `{mode}` selected for {self.__class__.__name__}")
                res = target_image

            results.append(res)

        results = torch.cat(results, dim=0)

        return (results, )

```
