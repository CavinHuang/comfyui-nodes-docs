---
tags:
- SAM
---

# SAMLoader (Pipe)
## Documentation
- Class name: `easy samLoaderPipe`
- Category: `EasyUse/Fix`
- Output node: `False`

The 'easy samLoaderPipe' node is designed to load and configure the SAM (Semantic Attention Model) for use in image processing pipelines. It facilitates the integration of SAM into custom workflows, enabling advanced image manipulation techniques such as semantic segmentation and attention-based image editing.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the SAM model to be loaded. This parameter is crucial for determining which specific SAM model will be utilized in the processing pipeline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`device_mode`**
    - Determines the hardware (CPU/GPU) preference for running the SAM model, allowing for optimized performance based on the available resources.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`sam_detection_hint`**
    - Guides the SAM model in focusing on specific areas or patterns within the image, enhancing the effectiveness of semantic segmentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`sam_dilation`**
    - Adjusts the dilation of the detected semantic areas, enabling finer control over the segmentation boundaries.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sam_threshold`**
    - Sets the confidence threshold for semantic detection, filtering out less certain areas to improve segmentation accuracy.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sam_bbox_expansion`**
    - Controls the expansion of bounding boxes around detected areas, useful for ensuring complete coverage of relevant segments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sam_mask_hint_threshold`**
    - Determines the threshold for mask hints, influencing how strongly the model should consider these hints in segmentation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sam_mask_hint_use_negative`**
    - Configures the model's handling of negative mask hints, affecting the exclusion of certain areas from the segmentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`sam_pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs a configured SAM pipeline, ready for integration into further image processing stages.
    - Python dtype: `Tuple`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class samLoaderForDetailerFix:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_name": (folder_paths.get_filename_list("sams"),),
                "device_mode": (["AUTO", "Prefer GPU", "CPU"],{"default": "AUTO"}),
                "sam_detection_hint": (
                ["center-1", "horizontal-2", "vertical-2", "rect-4", "diamond-4", "mask-area", "mask-points",
                 "mask-point-bbox", "none"],),
                "sam_dilation": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                "sam_threshold": ("FLOAT", {"default": 0.93, "min": 0.0, "max": 1.0, "step": 0.01}),
                "sam_bbox_expansion": ("INT", {"default": 0, "min": 0, "max": 1000, "step": 1}),
                "sam_mask_hint_threshold": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 1.0, "step": 0.01}),
                "sam_mask_hint_use_negative": (["False", "Small", "Outter"],),
            }
        }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("sam_pipe",)
    FUNCTION = "doit"

    CATEGORY = "EasyUse/Fix"

    def doit(self, model_name, device_mode, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative):
        if 'SAMLoader' not in ALL_NODE_CLASS_MAPPINGS:
            raise Exception(f"[ERROR] To use SAMLoader, you need to install 'Impact Pack'")
        cls = ALL_NODE_CLASS_MAPPINGS['SAMLoader']
        (sam_model,) = cls().load_model(model_name, device_mode)
        pipe = (sam_model, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative)
        return (pipe,)

```
