---
tags:
- Image
- ImageSave
---

# Image Receiver
## Documentation
- Class name: `ImageReceiver`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImageReceiver node is designed to process and transform image data received in various formats, including base64-encoded strings. It decodes, transposes, and converts images to a standardized format for further processing or analysis, optionally applying a mask if transparency data is available. This node plays a crucial role in preparing image data for downstream tasks by ensuring images are in a consistent and usable state.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the image to be processed. It is crucial for the node's operation as it serves as the primary input upon which all transformations and analyses are performed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `torch.Tensor`
- **`link_id`**
    - The 'link_id' parameter is used to identify the specific processing task or workflow instance. It helps in tracking and managing the processed images within a larger system or application.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`save_to_workflow`**
    - This boolean parameter determines whether the processed image should be saved to the workflow. Enabling this option triggers the image processing and transformation steps.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`image_data`**
    - The 'image_data' parameter contains the image information, typically as a base64-encoded string. It is essential for decoding and converting the image into a format suitable for further processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`trigger_always`**
    - This parameter controls whether the node's processing should be triggered unconditionally. It allows for flexibility in workflow execution, ensuring that image processing can occur as needed.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image, transformed and standardized for further use.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - An optional mask generated based on the image's transparency data, useful for selective processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageReceiver:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {"required": {
                    "image": (sorted(files), ),
                    "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                    "save_to_workflow": ("BOOLEAN", {"default": False}),
                    "image_data": ("STRING", {"multiline": False}),
                    "trigger_always": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
                    },
                }

    FUNCTION = "doit"

    RETURN_TYPES = ("IMAGE", "MASK")

    CATEGORY = "ImpactPack/Util"

    def doit(self, image, link_id, save_to_workflow, image_data, trigger_always):
        if save_to_workflow:
            try:
                image_data = base64.b64decode(image_data.split(",")[1])
                i = Image.open(BytesIO(image_data))
                i = ImageOps.exif_transpose(i)
                image = i.convert("RGB")
                image = np.array(image).astype(np.float32) / 255.0
                image = torch.from_numpy(image)[None,]
                if 'A' in i.getbands():
                    mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                    mask = 1. - torch.from_numpy(mask)
                else:
                    mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
                return (image, mask.unsqueeze(0))
            except Exception as e:
                print(f"[WARN] ComfyUI-Impact-Pack: ImageReceiver - invalid 'image_data'")
                mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
                return (empty_pil_tensor(64, 64), mask, )
        else:
            return nodes.LoadImage().load_image(image)

    @classmethod
    def VALIDATE_INPUTS(s, image, link_id, save_to_workflow, image_data, trigger_always):
        if image != '#DATA' and not folder_paths.exists_annotated_filepath(image) or image.startswith("/") or ".." in image:
            return "Invalid image file: {}".format(image)

        return True

    @classmethod
    def IS_CHANGED(s, image, link_id, save_to_workflow, image_data, trigger_always):
        if trigger_always:
            return float("NaN")
        else:
            if save_to_workflow:
                return hash(image_data)
            else:
                return hash(image)

```
