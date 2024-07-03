
# Documentation
- Class name: SaltScheduledImageAdjust
- Category: SALT/Scheduling/Image
- Output node: False
- Repo Ref: https://github.com/saltruism/salt-nodes

SaltScheduledImageAdjust节点专门用于对一批图像应用计划调整，允许随时间动态改变亮度、对比度、饱和度、锐度、高斯模糊和边缘增强。它能够创建图像属性按预定计划演变的序列，从而增强视觉叙事或数据可视化效果。

# Input types
## Required
- images
    - 要调整的图像集合。这个参数是节点操作的核心，它定义了将要进行计划转换的图像集。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
## Optional
- masks
    - 可选的蒙版，用于在图像上选择性地应用调整。这允许更精确地控制图像的哪些区域受到调整的影响。
    - Comfy dtype: MASK
    - Python dtype: List[Image]
- brightness_schedule
    - 定义图像亮度如何随时间变化的计划。这通过按预定序列改变图像的亮度来实现动态视觉效果。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- contrast_schedule
    - 规定随时间变化的对比度调整计划，允许增强或减少图像最暗和最亮部分之间的差异。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- saturation_schedule
    - 定义图像颜色强度如何随时间变化，使得能够创建鲜艳或柔和的颜色序列。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- sharpness_schedule
    - 调整图像细节清晰度或模糊度随时间变化的计划，有助于聚焦特定元素或创建梦幻般的序列。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- gaussian_blur_schedule
    - 确定随时间应用于图像的高斯模糊程度，允许创建柔焦效果或过渡。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- edge_enhance_schedule
    - 随时间增强图像内边缘的计划，可用于突出细节或创造更具图形感的外观。
    - Comfy dtype: LIST
    - Python dtype: List[float]

# Output types
- image
    - 应用计划调整后的图像，展示随时间的动态变化。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduledImageAdjust:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
            "optional": {
                "masks": ("MASK",),
                "brightness_schedule": ("LIST", ),
                "contrast_schedule": ("LIST", ),
                "saturation_schedule": ("LIST", ),
                "sharpness_schedule": ("LIST", ),
                "gaussian_blur_schedule": ("LIST", ),
                "edge_enhance_schedule": ("LIST", ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "images_adjust"

    CATEGORY = "SALT/Scheduling/Image"

    def float_value(self, adj_list, idx):
        if isinstance(adj_list, list) and adj_list:
            return adj_list[idx] if idx < len(adj_list) else adj_list[-1]
        else:
            return 1.0

    def images_adjust(
            self, 
            images, 
            masks=[], 
            brightness_schedule=[1.0], 
            contrast_schedule=[1.0], 
            saturation_schedule=[1.0], 
            sharpness_schedule=[1.0], 
            gaussian_blur_schedule=[0.0], 
            edge_enhance_schedule=[0.0]
        ):
        
        adjusted_images = []
        for idx, img in enumerate(images):
            original_pil_image = tensor2pil(img.unsqueeze(0))
            pil_image = original_pil_image.copy() 
            if isinstance(masks, torch.Tensor):
                pil_mask = mask2pil(masks[idx].unsqueeze(0)) if idx < len(masks) else mask2pil(masks[-1].unsqueeze(0))
                pil_mask = pil_mask.resize(original_pil_image.size).convert('L')
            else:
                pil_mask = None

            brightness = self.float_value(brightness_schedule, idx)
            contrast = self.float_value(contrast_schedule, idx)
            saturation = self.float_value(saturation_schedule, idx)
            sharpness = self.float_value(sharpness_schedule, idx)
            gaussian_blur = self.float_value(gaussian_blur_schedule, idx)
            edge_enhance = self.float_value(edge_enhance_schedule, idx)

            if brightness != 1.0:
                pil_image = ImageEnhance.Brightness(pil_image).enhance(brightness)
            
            if contrast != 1.0:
                pil_image = ImageEnhance.Contrast(pil_image).enhance(contrast)

            if saturation != 1.0:
                pil_image = ImageEnhance.Color(pil_image).enhance(saturation)

            if sharpness != 1.0:
                pil_image = ImageEnhance.Sharpness(pil_image).enhance(sharpness)

            if gaussian_blur > 0.0:
                pil_image = pil_image.filter(ImageFilter.GaussianBlur(radius=gaussian_blur))

            if edge_enhance > 0.0:
                edge_enhanced_img = pil_image.filter(ImageFilter.EDGE_ENHANCE_MORE)
                blend_mask = Image.new("L", pil_image.size, color=int(round(edge_enhance * 255)))
                pil_image = Image.composite(edge_enhanced_img, pil_image, blend_mask)

            if pil_mask:
                pil_image = Image.composite(pil_image, original_pil_image, pil_mask)

            adjusted_images.append(pil2tensor(pil_image))

        return (torch.cat(adjusted_images, dim=0), )

```
