---
tags:
- Searge
---

# Image Adapter v2
## Documentation
- Class name: `SeargeImageAdapterV2`
- Category: `Searge/UI/Prompting`
- Output node: `False`

The SeargeImageAdapterV2 node is designed to adapt image inputs for further processing within the SDXL framework, enabling the integration and manipulation of source images, image masks, and uploaded masks. It facilitates the creation of a standardized data structure for image-related inputs, ensuring compatibility and ease of use across various image processing operations.
## Input types
### Required
### Optional
- **`data`**
    - An optional data stream that can be provided to include additional information or parameters for image processing. It serves as a flexible input to accommodate various data needs.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict[str, Any]`
- **`source_image`**
    - An optional image input representing the primary source image for processing. It plays a crucial role in image adaptation tasks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`image_mask`**
    - An optional mask input for the source image, used to specify areas of interest or exclusion during image processing.
    - Comfy dtype: `MASK`
    - Python dtype: `Mask`
- **`uploaded_mask`**
    - An optional mask input uploaded by the user, allowing for custom mask definitions in image processing tasks.
    - Comfy dtype: `MASK`
    - Python dtype: `Mask`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Returns the adapted data stream, enriched with image processing inputs.
    - Python dtype: `Dict[str, Any]`
- **`image_inputs`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - Provides a UI component for image inputs, facilitating user interaction and visualization of image processing parameters.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeImageAdapterV2:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
                "source_image": ("IMAGE",),
                "image_mask": ("MASK",),
                "uploaded_mask": ("MASK",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM", "SRG_DATA_STREAM",)
    RETURN_NAMES = ("data", UI.S_IMAGE_INPUTS,)
    FUNCTION = "get_value"

    CATEGORY = UI.CATEGORY_UI_PROMPTING

    @staticmethod
    def create_dict(source_image, image_mask, uploaded_mask):
        return {
            UI.F_SOURCE_IMAGE_CHANGED: True,
            UI.F_SOURCE_IMAGE: source_image,
            UI.F_IMAGE_MASK_CHANGED: True,
            UI.F_IMAGE_MASK: image_mask,
            UI.F_UPLOADED_MASK_CHANGED: True,
            UI.F_UPLOADED_MASK: uploaded_mask,
        }

    def get_value(self, source_image=None, image_mask=None, uploaded_mask=None, data=None):
        if data is None:
            data = {}

        data[UI.S_IMAGE_INPUTS] = self.create_dict(
            source_image,
            image_mask,
            uploaded_mask,
        )

        return (data, data[UI.S_IMAGE_INPUTS],)

```
