---
tags:
- Segmentation
---

# SEGSPreview (CNET Image)
## Documentation
- Class name: `SEGSPreviewCNet`
- Category: `ImpactPack/Util`
- Output node: `True`

SEGSPreviewCNet is designed to generate previews of segmentation results, specifically focusing on the control networks associated with each segmentation. It saves these previews as images, facilitating a visual inspection of how control networks influence the segmentation process.
## Input types
### Required
- **`segs`**
    - The 'segs' parameter represents the segmentation results to be previewed. It is crucial for generating the control network-based previews, as it contains the segmentation data along with associated control network information.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[Tuple[Any, Any], List[Any]]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - The 'ui' parameter contains the generated preview images of the segmentation results, specifically highlighting the control networks' impact.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSPreviewCNet:
    def __init__(self):
        self.output_dir = folder_paths.get_temp_directory()
        self.type = "temp"

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"segs": ("SEGS", ),}, }

    RETURN_TYPES = ("IMAGE", )
    OUTPUT_IS_LIST = (True, )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    OUTPUT_NODE = True

    def doit(self, segs):
        full_output_folder, filename, counter, subfolder, filename_prefix = \
            folder_paths.get_save_image_path("impact_seg_preview", self.output_dir, segs[0][1], segs[0][0])

        results = list()
        result_image_list = []

        for seg in segs[1]:
            file = f"{filename}_{counter:05}_.webp"

            if seg.control_net_wrapper is not None and seg.control_net_wrapper.control_image is not None:
                cnet_image = seg.control_net_wrapper.control_image
                result_image_list.append(cnet_image)
            else:
                cnet_image = empty_pil_tensor(64, 64)

            cnet_pil = utils.tensor2pil(cnet_image)
            cnet_pil.save(os.path.join(full_output_folder, file))

            results.append({
                "filename": file,
                "subfolder": subfolder,
                "type": self.type
            })

            counter += 1

        return {"ui": {"images": results}, "result": (result_image_list,)}

```
