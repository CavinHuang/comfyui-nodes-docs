---
tags:
- Crop
- Image
- ImageTransformation
---

# BatchCropFromMask
## Documentation
- Class name: `BatchCropFromMask`
- Category: `KJNodes/masking`
- Output node: `False`

The BatchCropFromMask node is designed to process a batch of masks and corresponding images, identifying and cropping out the relevant areas defined by the masks. It dynamically calculates the optimal bounding box for each mask to ensure that the cropped images retain the most significant parts of the original images, based on the presence of non-zero pixels in the masks.
## Input types
### Required
- **`original_images`**
    - The 'original_images' parameter is a batch of images that correspond to the masks provided. These images are cropped according to the calculated bounding boxes from the masks, resulting in a set of images focused on the areas of interest.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`masks`**
    - The 'masks' parameter represents a batch of masks that define areas of interest within the corresponding images. It is crucial for determining the regions to crop, as the node calculates bounding boxes based on these masks.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`crop_size_mult`**
    - The 'crop_size_mult' parameter allows for adjusting the size of the crop dynamically. It acts as a multiplier to the calculated bounding box dimensions, enabling fine-tuning of the crop size based on specific requirements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_smooth_alpha`**
    - The 'bbox_smooth_alpha' parameter is used to smooth the changes in bounding box sizes across different masks. This helps in achieving more consistent crop sizes and shapes by applying a smoothing factor to the size calculations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`original_images`**
    - Comfy dtype: `IMAGE`
    - This output includes the original images provided as input, unchanged by the cropping process.
    - Python dtype: `torch.Tensor`
- **`cropped_images`**
    - Comfy dtype: `IMAGE`
    - This output includes the images cropped according to the calculated bounding boxes from the masks, focusing on the areas of interest.
    - Python dtype: `torch.Tensor`
- **`bboxes`**
    - Comfy dtype: `BBOX`
    - This output provides the bounding boxes calculated for each mask, indicating the areas that were cropped from the original images.
    - Python dtype: `List[tuple]`
- **`width`**
    - Comfy dtype: `INT`
    - This output provides the width of the largest bounding box calculated across all masks, after adjustments and smoothing.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - This output provides the height of the largest bounding box calculated across all masks, after adjustments and smoothing.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchCropFromMask:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "original_images": ("IMAGE",),
                "masks": ("MASK",),
                "crop_size_mult": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.001}),
                "bbox_smooth_alpha": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = (
        "IMAGE",
        "IMAGE",
        "BBOX",
        "INT",
        "INT",
    )
    RETURN_NAMES = (
        "original_images",
        "cropped_images",
        "bboxes",
        "width",
        "height",
    )
    FUNCTION = "crop"
    CATEGORY = "KJNodes/masking"

    def smooth_bbox_size(self, prev_bbox_size, curr_bbox_size, alpha):
        if alpha == 0:
            return prev_bbox_size
        return round(alpha * curr_bbox_size + (1 - alpha) * prev_bbox_size)

    def smooth_center(self, prev_center, curr_center, alpha=0.5):
        if alpha == 0:
            return prev_center
        return (
            round(alpha * curr_center[0] + (1 - alpha) * prev_center[0]),
            round(alpha * curr_center[1] + (1 - alpha) * prev_center[1])
        )

    def crop(self, masks, original_images, crop_size_mult, bbox_smooth_alpha):
 
        bounding_boxes = []
        cropped_images = []

        self.max_bbox_width = 0
        self.max_bbox_height = 0

        # First, calculate the maximum bounding box size across all masks
        curr_max_bbox_width = 0
        curr_max_bbox_height = 0
        for mask in masks:
            _mask = tensor2pil(mask)[0]
            non_zero_indices = np.nonzero(np.array(_mask))
            min_x, max_x = np.min(non_zero_indices[1]), np.max(non_zero_indices[1])
            min_y, max_y = np.min(non_zero_indices[0]), np.max(non_zero_indices[0])
            width = max_x - min_x
            height = max_y - min_y
            curr_max_bbox_width = max(curr_max_bbox_width, width)
            curr_max_bbox_height = max(curr_max_bbox_height, height)

        # Smooth the changes in the bounding box size
        self.max_bbox_width = self.smooth_bbox_size(self.max_bbox_width, curr_max_bbox_width, bbox_smooth_alpha)
        self.max_bbox_height = self.smooth_bbox_size(self.max_bbox_height, curr_max_bbox_height, bbox_smooth_alpha)

        # Apply the crop size multiplier
        self.max_bbox_width = round(self.max_bbox_width * crop_size_mult)
        self.max_bbox_height = round(self.max_bbox_height * crop_size_mult)
        bbox_aspect_ratio = self.max_bbox_width / self.max_bbox_height

        # Then, for each mask and corresponding image...
        for i, (mask, img) in enumerate(zip(masks, original_images)):
            _mask = tensor2pil(mask)[0]
            non_zero_indices = np.nonzero(np.array(_mask))
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

            # Create bounding box using max_bbox_width and max_bbox_height
            half_box_width = round(self.max_bbox_width / 2)
            half_box_height = round(self.max_bbox_height / 2)
            min_x = max(0, center[0] - half_box_width)
            max_x = min(img.shape[1], center[0] + half_box_width)
            min_y = max(0, center[1] - half_box_height)
            max_y = min(img.shape[0], center[1] + half_box_height)

            # Append bounding box coordinates
            bounding_boxes.append((min_x, min_y, max_x - min_x, max_y - min_y))

            # Crop the image from the bounding box
            cropped_img = img[min_y:max_y, min_x:max_x, :]
            
            # Calculate the new dimensions while maintaining the aspect ratio
            new_height = min(cropped_img.shape[0], self.max_bbox_height)
            new_width = round(new_height * bbox_aspect_ratio)

            # Resize the image
            resize_transform = Resize((new_height, new_width))
            resized_img = resize_transform(cropped_img.permute(2, 0, 1))

            # Perform the center crop to the desired size
            crop_transform = CenterCrop((self.max_bbox_height, self.max_bbox_width)) # swap the order here if necessary
            cropped_resized_img = crop_transform(resized_img)

            cropped_images.append(cropped_resized_img.permute(1, 2, 0))

        cropped_out = torch.stack(cropped_images, dim=0)
        
        return (original_images, cropped_out, bounding_boxes, self.max_bbox_width, self.max_bbox_height, )

```
