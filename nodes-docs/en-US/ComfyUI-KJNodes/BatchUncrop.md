---
tags:
- Crop
- Image
- ImageTransformation
---

# BatchUncrop
## Documentation
- Class name: `BatchUncrop`
- Category: `KJNodes/masking`
- Output node: `False`

The BatchUncrop node is designed to reverse the cropping process on a batch of images. It takes original images and their cropped versions along with cropping metadata to reconstruct the original images with the cropped areas seamlessly integrated, adjusting for borders and scaling as necessary.
## Input types
### Required
- **`original_images`**
    - Original images before cropping, used as a base for the uncropping process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`cropped_images`**
    - Cropped images that need to be integrated back into the original images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`bboxes`**
    - Bounding boxes specifying the cropped areas in the original images.
    - Comfy dtype: `BBOX`
    - Python dtype: `List[Tuple[int, int, int, int]]`
- **`border_blending`**
    - Controls the blending of the borders during the uncropping process to ensure a seamless integration.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`crop_rescale`**
    - Indicates whether the cropped images should be rescaled to their original size before uncropping.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`border_top`**
    - Specifies whether to apply a top border during the uncropping process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`border_bottom`**
    - Specifies whether to apply a bottom border during the uncropping process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`border_left`**
    - Specifies whether to apply a left border during the uncropping process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`border_right`**
    - Specifies whether to apply a right border during the uncropping process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The original images with the cropped areas seamlessly integrated.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchUncrop:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "original_images": ("IMAGE",),
                "cropped_images": ("IMAGE",),
                "bboxes": ("BBOX",),
                "border_blending": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.01}, ),
                "crop_rescale": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "border_top": ("BOOLEAN", {"default": True}),
                "border_bottom": ("BOOLEAN", {"default": True}),
                "border_left": ("BOOLEAN", {"default": True}),
                "border_right": ("BOOLEAN", {"default": True}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "uncrop"

    CATEGORY = "KJNodes/masking"

    def uncrop(self, original_images, cropped_images, bboxes, border_blending, crop_rescale, border_top, border_bottom, border_left, border_right):
        def inset_border(image, border_width, border_color, border_top, border_bottom, border_left, border_right):
            draw = ImageDraw.Draw(image)
            width, height = image.size
            if border_top:
                draw.rectangle((0, 0, width, border_width), fill=border_color)
            if border_bottom:
                draw.rectangle((0, height - border_width, width, height), fill=border_color)
            if border_left:
                draw.rectangle((0, 0, border_width, height), fill=border_color)
            if border_right:
                draw.rectangle((width - border_width, 0, width, height), fill=border_color)
            return image

        if len(original_images) != len(cropped_images):
            raise ValueError(f"The number of original_images ({len(original_images)}) and cropped_images ({len(cropped_images)}) should be the same")

        # Ensure there are enough bboxes, but drop the excess if there are more bboxes than images
        if len(bboxes) > len(original_images):
            print(f"Warning: Dropping excess bounding boxes. Expected {len(original_images)}, but got {len(bboxes)}")
            bboxes = bboxes[:len(original_images)]
        elif len(bboxes) < len(original_images):
            raise ValueError("There should be at least as many bboxes as there are original and cropped images")

        input_images = tensor2pil(original_images)
        crop_imgs = tensor2pil(cropped_images)
        
        out_images = []
        for i in range(len(input_images)):
            img = input_images[i]
            crop = crop_imgs[i]
            bbox = bboxes[i]
            
            # uncrop the image based on the bounding box
            bb_x, bb_y, bb_width, bb_height = bbox

            paste_region = bbox_to_region((bb_x, bb_y, bb_width, bb_height), img.size)
            
            # scale factors
            scale_x = crop_rescale
            scale_y = crop_rescale

            # scaled paste_region
            paste_region = (round(paste_region[0]*scale_x), round(paste_region[1]*scale_y), round(paste_region[2]*scale_x), round(paste_region[3]*scale_y))

            # rescale the crop image to fit the paste_region
            crop = crop.resize((round(paste_region[2]-paste_region[0]), round(paste_region[3]-paste_region[1])))
            crop_img = crop.convert("RGB")
   
            if border_blending > 1.0:
                border_blending = 1.0
            elif border_blending < 0.0:
                border_blending = 0.0

            blend_ratio = (max(crop_img.size) / 2) * float(border_blending)

            blend = img.convert("RGBA")
            mask = Image.new("L", img.size, 0)

            mask_block = Image.new("L", (paste_region[2]-paste_region[0], paste_region[3]-paste_region[1]), 255)
            mask_block = inset_border(mask_block, round(blend_ratio / 2), (0), border_top, border_bottom, border_left, border_right)
                      
            mask.paste(mask_block, paste_region)
            blend.paste(crop_img, paste_region)

            mask = mask.filter(ImageFilter.BoxBlur(radius=blend_ratio / 4))
            mask = mask.filter(ImageFilter.GaussianBlur(radius=blend_ratio / 4))

            blend.putalpha(mask)
            img = Image.alpha_composite(img.convert("RGBA"), blend)
            out_images.append(img.convert("RGB"))

        return (pil2tensor(out_images),)

```
