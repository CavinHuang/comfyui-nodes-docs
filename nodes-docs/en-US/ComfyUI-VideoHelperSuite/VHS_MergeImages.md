---
tags:
- Multimedia
- VideoHelperSuite
---

# Merge Image Batches 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_MergeImages`
- Category: `Video Helper Suite 🎥🅥🅗🅢/image`
- Output node: `False`

The VHS_MergeImages node is designed for combining two sets of images into a single set, allowing for flexible manipulation of image batches within the Video Helper Suite. It supports various strategies for merging, including matching dimensions by selecting the larger or smaller set, or explicitly choosing one set's dimensions to match. Additionally, it offers scaling and cropping options to ensure the merged images meet specific requirements.
## Input types
### Required
- **`images_A`**
    - The first set of images to be merged. This set can either serve as the template for merging or be adjusted to match the dimensions of the second set, depending on the chosen merge strategy.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tensor`
- **`images_B`**
    - The second set of images to be merged with the first. Depending on the merge strategy, these images may be scaled or cropped to match the dimensions of the first set.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tensor`
- **`merge_strategy`**
    - Determines how the dimensions of the two image sets are matched during the merge process. Options include matching to the first set, the second set, the smaller or larger dimensions among them.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale_method`**
    - Specifies the scaling algorithm to be used when adjusting the dimensions of one image set to match the other. Options include nearest-exact, bilinear, area, bicubic, and bislerp.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop`**
    - Defines the cropping method to be applied if necessary during the scaling process. Options are 'disabled' for no cropping or 'center' for center-based cropping.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The resulting set of merged images.
    - Python dtype: `Tensor`
- **`count`**
    - Comfy dtype: `INT`
    - The total number of images in the merged set.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MergeImages:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images_A": ("IMAGE",),
                "images_B": ("IMAGE",),
                "merge_strategy": (MergeStrategies.list_all,),
                "scale_method": (ScaleMethods.list_all,),
                "crop": (CropMethods.list_all,),
            }
        }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/image"

    RETURN_TYPES = ("IMAGE", "INT",)
    RETURN_NAMES = ("IMAGE", "count",)
    FUNCTION = "merge"

    def merge(self, images_A: Tensor, images_B: Tensor, merge_strategy: str, scale_method: str, crop: str):
        images = []
        # if not same dimensions, do scaling
        if images_A.shape[3] != images_B.shape[3] or images_A.shape[2] != images_B.shape[2]:
            images_A = images_A.movedim(-1,1)
            images_B = images_B.movedim(-1,1)

            A_size = images_A.shape[3] * images_A.shape[2]
            B_size = images_B.shape[3] * images_B.shape[2]
            # determine which to use
            use_A_as_template = True
            if merge_strategy == MergeStrategies.MATCH_A:
                pass
            elif merge_strategy == MergeStrategies.MATCH_B:
                use_A_as_template = False
            elif merge_strategy in (MergeStrategies.MATCH_SMALLER, MergeStrategies.MATCH_LARGER):
                if A_size <= B_size:
                    use_A_as_template = True if merge_strategy == MergeStrategies.MATCH_SMALLER else False
            # apply scaling
            if use_A_as_template:
                images_B = comfy.utils.common_upscale(images_B, images_A.shape[3], images_A.shape[2], scale_method, crop)
            else:
                images_A = comfy.utils.common_upscale(images_A, images_B.shape[3], images_B.shape[2], scale_method, crop)
            images_A = images_A.movedim(1,-1)
            images_B = images_B.movedim(1,-1)

        images.append(images_A)
        images.append(images_B)
        all_images = torch.cat(images, dim=0)
        return (all_images, all_images.size(0),)

```
