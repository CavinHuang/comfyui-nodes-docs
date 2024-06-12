---
tags:
- Crop
- Image
- ImageTransformation
---

# BatchUncropAdvanced
## Documentation
- Class name: `BatchUncropAdvanced`
- Category: `KJNodes/masking`
- Output node: `False`

The `BatchUncropAdvanced` node is designed for the advanced uncropping of images in a batch process. It combines original images with their cropped versions, applying sophisticated techniques such as border blending, rescaling, and optional use of combined or square masks to achieve seamless integration of cropped areas back into the original images.
## Input types
### Required
- **`original_images`**
    - The collection of original images that were previously cropped. These images serve as the base for the uncropping process, ensuring that the cropped content is accurately integrated back into its original context.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`cropped_images`**
    - The set of images that have been cropped from the original images. These images are to be uncropped and merged back into the original images, utilizing advanced techniques for seamless integration.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`cropped_masks`**
    - Masks indicating the regions of the original images that were cropped. These masks are crucial for accurately aligning the cropped images back into their original positions.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
- **`combined_crop_mask`**
    - A single mask that combines all individual cropped masks. This is used for advanced uncropping scenarios where a unified approach to mask application is beneficial.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`bboxes`**
    - Bounding boxes that define the cropped areas within the original images. These are essential for precise placement and scaling of the cropped images during the uncropping process.
    - Comfy dtype: `BBOX`
    - Python dtype: `List[Tuple[int, int, int, int]]`
- **`border_blending`**
    - The degree to which the borders of the cropped images are blended with the original images. This parameter is key to achieving a natural-looking integration of the cropped areas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`crop_rescale`**
    - Indicates whether the cropped images should be rescaled to their original size before being uncropped. This is important for maintaining the original aspect ratio and size of the image content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`use_combined_mask`**
    - Determines whether the combined crop mask is used for the uncropping process. This option allows for more complex uncropping scenarios where a single mask is preferable.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`use_square_mask`**
    - Specifies if a square mask should be used instead of the actual crop shapes. This can simplify the uncropping process in certain scenarios.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`combined_bounding_box`**
    - An optional parameter that defines a unified bounding box for scenarios where a single, combined area is preferred for uncropping. This allows for more controlled placement and scaling of the uncropped content.
    - Comfy dtype: `BBOX`
    - Python dtype: `Optional[Tuple[int, int, int, int]]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The original images after the cropped images have been uncropped and integrated back into them. This output reflects the successful merging of cropped content back into its original context.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchUncropAdvanced:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "original_images": ("IMAGE",),
                "cropped_images": ("IMAGE",), 
                "cropped_masks": ("MASK",),
                "combined_crop_mask": ("MASK",),
                "bboxes": ("BBOX",),
                "border_blending": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.01}, ),
                "crop_rescale": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "use_combined_mask": ("BOOLEAN", {"default": False}),
                "use_square_mask": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "combined_bounding_box": ("BBOX", {"default": None}),  
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "uncrop"
    CATEGORY = "KJNodes/masking"


    def uncrop(self, original_images, cropped_images, cropped_masks, combined_crop_mask, bboxes, border_blending, crop_rescale, use_combined_mask, use_square_mask, combined_bounding_box = None):
        
        def inset_border(image, border_width=20, border_color=(0)):
            width, height = image.size
            bordered_image = Image.new(image.mode, (width, height), border_color)
            bordered_image.paste(image, (0, 0))
            draw = ImageDraw.Draw(bordered_image)
            draw.rectangle((0, 0, width - 1, height - 1), outline=border_color, width=border_width)
            return bordered_image

        if len(original_images) != len(cropped_images):
            raise ValueError(f"The number of original_images ({len(original_images)}) and cropped_images ({len(cropped_images)}) should be the same")

        # Ensure there are enough bboxes, but drop the excess if there are more bboxes than images
        if len(bboxes) > len(original_images):
            print(f"Warning: Dropping excess bounding boxes. Expected {len(original_images)}, but got {len(bboxes)}")
            bboxes = bboxes[:len(original_images)]
        elif len(bboxes) < len(original_images):
            raise ValueError("There should be at least as many bboxes as there are original and cropped images")

        crop_imgs = tensor2pil(cropped_images)
        input_images = tensor2pil(original_images)
        out_images = []

        for i in range(len(input_images)):
            img = input_images[i]
            crop = crop_imgs[i]
            bbox = bboxes[i]
            
            if use_combined_mask:
                bb_x, bb_y, bb_width, bb_height = combined_bounding_box[0]
                paste_region = bbox_to_region((bb_x, bb_y, bb_width, bb_height), img.size)
                mask = combined_crop_mask[i]
            else:
                bb_x, bb_y, bb_width, bb_height = bbox
                paste_region = bbox_to_region((bb_x, bb_y, bb_width, bb_height), img.size)
                mask = cropped_masks[i]
            
            # scale paste_region
            scale_x = scale_y = crop_rescale
            paste_region = (round(paste_region[0]*scale_x), round(paste_region[1]*scale_y), round(paste_region[2]*scale_x), round(paste_region[3]*scale_y))

            # rescale the crop image to fit the paste_region
            crop = crop.resize((round(paste_region[2]-paste_region[0]), round(paste_region[3]-paste_region[1])))
            crop_img = crop.convert("RGB")

            #border blending
            if border_blending > 1.0:
                border_blending = 1.0
            elif border_blending < 0.0:
                border_blending = 0.0

            blend_ratio = (max(crop_img.size) / 2) * float(border_blending)
            blend = img.convert("RGBA")

            if use_square_mask:
                mask = Image.new("L", img.size, 0)
                mask_block = Image.new("L", (paste_region[2]-paste_region[0], paste_region[3]-paste_region[1]), 255)
                mask_block = inset_border(mask_block, round(blend_ratio / 2), (0))
                mask.paste(mask_block, paste_region)
            else:
                original_mask = tensor2pil(mask)[0]
                original_mask = original_mask.resize((paste_region[2]-paste_region[0], paste_region[3]-paste_region[1]))
                mask = Image.new("L", img.size, 0)
                mask.paste(original_mask, paste_region)

            mask = mask.filter(ImageFilter.BoxBlur(radius=blend_ratio / 4))
            mask = mask.filter(ImageFilter.GaussianBlur(radius=blend_ratio / 4))

            blend.paste(crop_img, paste_region) 
            blend.putalpha(mask)
            
            img = Image.alpha_composite(img.convert("RGBA"), blend)
            out_images.append(img.convert("RGB"))

        return (pil2tensor(out_images),)

```
