---
tags:
- Scheduling
---

# Batch Image Scheduled Adjustments
## Documentation
- Class name: `SaltScheduledImageAdjust`
- Category: `SALT/Scheduling/Image`
- Output node: `False`

This node is designed to apply scheduled adjustments to a batch of images, allowing for dynamic changes in brightness, contrast, saturation, sharpness, gaussian blur, and edge enhancement over time. It enables the creation of sequences where image properties evolve according to predefined schedules, enhancing visual storytelling or data visualization.
## Input types
### Required
- **`images`**
    - The collection of images to be adjusted. This parameter is central to the node's operation, as it defines the set of images that will undergo the scheduled transformations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
### Optional
- **`masks`**
    - Optional masks to apply the adjustments selectively on the images. This allows for more precise control over which areas of the images are affected by the adjustments.
    - Comfy dtype: `MASK`
    - Python dtype: `List[Image]`
- **`brightness_schedule`**
    - A schedule defining how the brightness of the images should change over time. This enables dynamic visual effects by altering the lightness of the images according to a predefined sequence.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`contrast_schedule`**
    - A schedule that dictates the contrast adjustments over time, allowing for the enhancement or reduction of the difference between the darkest and lightest parts of the images.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`saturation_schedule`**
    - Defines how the color intensity of the images changes over time, enabling the creation of vibrant or muted color sequences.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`sharpness_schedule`**
    - A schedule for adjusting the clarity or blur of the images' details over time, facilitating the focus on specific elements or the creation of dreamy sequences.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`gaussian_blur_schedule`**
    - Determines the degree of Gaussian blur applied to the images over time, allowing for the creation of soft-focus effects or transitions.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
- **`edge_enhance_schedule`**
    - A schedule for enhancing the edges within the images over time, which can be used to highlight details or create a more graphic look.
    - Comfy dtype: `LIST`
    - Python dtype: `List[float]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The adjusted images after the application of the scheduled adjustments, showcasing the dynamic changes over time.
    - Python dtype: `List[Image]`
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
