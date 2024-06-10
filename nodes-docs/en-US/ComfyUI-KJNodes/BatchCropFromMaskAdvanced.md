---
tags:
- Crop
- Image
- ImageTransformation
---

# BatchCropFromMaskAdvanced
## Documentation
- Class name: `BatchCropFromMaskAdvanced`
- Category: `KJNodes/masking`
- Output node: `False`

This node is designed for advanced cropping operations on batches of images based on their associated masks. It calculates the optimal bounding box for each mask, applies smoothing to the bounding box sizes, and adjusts the crop size dynamically to ensure consistency and precision across the batch.
## Input types
### Required
- **`original_images`**
    - The batch of original images that will be cropped according to the calculated bounding boxes derived from the masks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`masks`**
    - A batch of masks used to determine the areas of interest for cropping the corresponding images. The masks guide the cropping process by identifying non-zero regions that signify relevant content.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`crop_size_mult`**
    - A multiplier that adjusts the size of the crop dynamically, allowing for flexibility in the final crop dimensions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_smooth_alpha`**
    - A parameter used to smooth the changes in bounding box sizes across the batch, ensuring a more consistent crop size.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`original_images`**
    - Comfy dtype: `IMAGE`
    - The original batch of images provided as input, returned without modifications.
    - Python dtype: `List[torch.Tensor]`
- **`cropped_images`**
    - Comfy dtype: `IMAGE`
    - The resulting batch of images after cropping, tailored to the areas of interest defined by the masks.
    - Python dtype: `List[torch.Tensor]`
- **`cropped_masks`**
    - Comfy dtype: `MASK`
    - The corresponding batch of masks after cropping, aligned with the cropped images.
    - Python dtype: `List[torch.Tensor]`
- **`combined_crop_image`**
    - Comfy dtype: `IMAGE`
    - A single image created by combining the cropped areas from the original images, based on the combined bounding box.
    - Python dtype: `torch.Tensor`
- **`combined_crop_masks`**
    - Comfy dtype: `MASK`
    - A single mask created by combining the cropped areas from the original masks, based on the combined bounding box.
    - Python dtype: `torch.Tensor`
- **`bboxes`**
    - Comfy dtype: `BBOX`
    - The list of bounding boxes calculated for each mask, used for cropping the images.
    - Python dtype: `List[Tuple[int, int, int, int]]`
- **`combined_bounding_box`**
    - Comfy dtype: `BBOX`
    - The combined bounding box calculated from all masks, used for creating the combined cropped image and mask.
    - Python dtype: `Tuple[int, int, int, int]`
- **`bbox_width`**
    - Comfy dtype: `INT`
    - The width of the largest bounding box calculated across all masks, adjusted for consistency and precision.
    - Python dtype: `int`
- **`bbox_height`**
    - Comfy dtype: `INT`
    - The height of the largest bounding box calculated across all masks, adjusted for consistency and precision.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchCropFromMaskAdvanced:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "original_images": ("IMAGE",),
                "masks": ("MASK",),
                "crop_size_mult": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "bbox_smooth_alpha": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = (
        "IMAGE",
        "IMAGE",
        "MASK",
        "IMAGE",
        "MASK",
        "BBOX",
        "BBOX",
        "INT",
        "INT",
    )
    RETURN_NAMES = (
        "original_images",
        "cropped_images",
        "cropped_masks",
        "combined_crop_image",
        "combined_crop_masks",
        "bboxes",
        "combined_bounding_box",
        "bbox_width",
        "bbox_height",
    )
    FUNCTION = "crop"
    CATEGORY = "KJNodes/masking"

    def smooth_bbox_size(self, prev_bbox_size, curr_bbox_size, alpha):
          return round(alpha * curr_bbox_size + (1 - alpha) * prev_bbox_size)

    def smooth_center(self, prev_center, curr_center, alpha=0.5):
        return (round(alpha * curr_center[0] + (1 - alpha) * prev_center[0]),
                round(alpha * curr_center[1] + (1 - alpha) * prev_center[1]))

    def crop(self, masks, original_images, crop_size_mult, bbox_smooth_alpha):
        bounding_boxes = []
        combined_bounding_box = []
        cropped_images = []
        cropped_masks = []
        cropped_masks_out = []
        combined_crop_out = []
        combined_cropped_images = []
        combined_cropped_masks = []
        
        def calculate_bbox(mask):
            non_zero_indices = np.nonzero(np.array(mask))

            # handle empty masks
            min_x, max_x, min_y, max_y = 0, 0, 0, 0
            if len(non_zero_indices[1]) > 0 and len(non_zero_indices[0]) > 0:
                min_x, max_x = np.min(non_zero_indices[1]), np.max(non_zero_indices[1])
                min_y, max_y = np.min(non_zero_indices[0]), np.max(non_zero_indices[0])

            width = max_x - min_x
            height = max_y - min_y
            bbox_size = max(width, height)
            return min_x, max_x, min_y, max_y, bbox_size

        combined_mask = torch.max(masks, dim=0)[0]
        _mask = tensor2pil(combined_mask)[0]
        new_min_x, new_max_x, new_min_y, new_max_y, combined_bbox_size = calculate_bbox(_mask)
        center_x = (new_min_x + new_max_x) / 2
        center_y = (new_min_y + new_max_y) / 2
        half_box_size = round(combined_bbox_size // 2)
        new_min_x = max(0, round(center_x - half_box_size))
        new_max_x = min(original_images[0].shape[1], round(center_x + half_box_size))
        new_min_y = max(0, round(center_y - half_box_size))
        new_max_y = min(original_images[0].shape[0], round(center_y + half_box_size))
        
        combined_bounding_box.append((new_min_x, new_min_y, new_max_x - new_min_x, new_max_y - new_min_y))   
        
        self.max_bbox_size = 0
        
        # First, calculate the maximum bounding box size across all masks
        curr_max_bbox_size = max(calculate_bbox(tensor2pil(mask)[0])[-1] for mask in masks)
        # Smooth the changes in the bounding box size
        self.max_bbox_size = self.smooth_bbox_size(self.max_bbox_size, curr_max_bbox_size, bbox_smooth_alpha)
        # Apply the crop size multiplier
        self.max_bbox_size = round(self.max_bbox_size * crop_size_mult)
        # Make sure max_bbox_size is divisible by 16, if not, round it upwards so it is
        self.max_bbox_size = math.ceil(self.max_bbox_size / 16) * 16

        if self.max_bbox_size > original_images[0].shape[0] or self.max_bbox_size > original_images[0].shape[1]:
            # max_bbox_size can only be as big as our input's width or height, and it has to be even
            self.max_bbox_size = math.floor(min(original_images[0].shape[0], original_images[0].shape[1]) / 2) * 2

        # Then, for each mask and corresponding image...
        for i, (mask, img) in enumerate(zip(masks, original_images)):
            _mask = tensor2pil(mask)[0]
            non_zero_indices = np.nonzero(np.array(_mask))

            # check for empty masks
            if len(non_zero_indices[0]) > 0 and len(non_zero_indices[1]) > 0:
                min_x, max_x = np.min(non_zero_indices[1]), np.max(non_zero_indices[1])
                min_y, max_y = np.min(non_zero_indices[0]), np.max(non_zero_indices[0])

                # Calculate center of bounding box
                center_x = np.mean(non_zero_indices[1])
                center_y = np.mean(non_zero_indices[0])
                curr_center = (round(center_x), round(center_y))

                # If this is the first frame, initialize prev_center with curr_center
                if not hasattr(self, 'prev_center'):
                    self.prev_center = curr_center

                # Smooth the changes in the center coordinates from the second frame onwards
                if i > 0:
                    center = self.smooth_center(self.prev_center, curr_center, bbox_smooth_alpha)
                else:
                    center = curr_center

                # Update prev_center for the next frame
                self.prev_center = center

                # Create bounding box using max_bbox_size
                half_box_size = self.max_bbox_size // 2
                min_x = max(0, center[0] - half_box_size)
                max_x = min(img.shape[1], center[0] + half_box_size)
                min_y = max(0, center[1] - half_box_size)
                max_y = min(img.shape[0], center[1] + half_box_size)

                # Append bounding box coordinates
                bounding_boxes.append((min_x, min_y, max_x - min_x, max_y - min_y))

                # Crop the image from the bounding box
                cropped_img = img[min_y:max_y, min_x:max_x, :]
                cropped_mask = mask[min_y:max_y, min_x:max_x]

                # Resize the cropped image to a fixed size
                new_size = max(cropped_img.shape[0], cropped_img.shape[1])
                resize_transform = Resize(new_size, interpolation=InterpolationMode.NEAREST, max_size=max(img.shape[0], img.shape[1]))
                resized_mask = resize_transform(cropped_mask.unsqueeze(0).unsqueeze(0)).squeeze(0).squeeze(0)
                resized_img = resize_transform(cropped_img.permute(2, 0, 1))
                # Perform the center crop to the desired size
                # Constrain the crop to the smaller of our bbox or our image so we don't expand past the image dimensions.
                crop_transform = CenterCrop((min(self.max_bbox_size, resized_img.shape[1]), min(self.max_bbox_size, resized_img.shape[2])))

                cropped_resized_img = crop_transform(resized_img)
                cropped_images.append(cropped_resized_img.permute(1, 2, 0))

                cropped_resized_mask = crop_transform(resized_mask)
                cropped_masks.append(cropped_resized_mask)

                combined_cropped_img = original_images[i][new_min_y:new_max_y, new_min_x:new_max_x, :]
                combined_cropped_images.append(combined_cropped_img)

                combined_cropped_mask = masks[i][new_min_y:new_max_y, new_min_x:new_max_x]
                combined_cropped_masks.append(combined_cropped_mask)
            else:
                bounding_boxes.append((0, 0, img.shape[1], img.shape[0]))
                cropped_images.append(img)
                cropped_masks.append(mask)
                combined_cropped_images.append(img)
                combined_cropped_masks.append(mask)

        cropped_out = torch.stack(cropped_images, dim=0)
        combined_crop_out = torch.stack(combined_cropped_images, dim=0)
        cropped_masks_out = torch.stack(cropped_masks, dim=0)
        combined_crop_mask_out = torch.stack(combined_cropped_masks, dim=0)

        return (original_images, cropped_out, cropped_masks_out, combined_crop_out, combined_crop_mask_out, bounding_boxes, combined_bounding_box, self.max_bbox_size, self.max_bbox_size)

```
