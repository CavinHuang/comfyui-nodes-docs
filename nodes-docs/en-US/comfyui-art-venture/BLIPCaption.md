---
tags:
- Loader
- ModelIO
---

# BLIP Caption
## Documentation
- Class name: `BLIPCaption`
- Category: `Art Venture/Captioning`
- Output node: `False`

The `BLIPCaption` node is designed to generate textual captions for images using the BLIP model. It leverages deep learning techniques to analyze visual content and produce descriptive, human-like text based on the image's elements and context. This node can be customized with prefixes and suffixes to the generated captions, and it supports adjusting the length of the output text to fit specific requirements.
## Input types
### Required
- **`image`**
    - The input image to be captioned. This is the primary data the node processes to generate a textual description.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`min_length`**
    - Specifies the minimum length of the generated caption. This parameter helps in ensuring that the captions are not too brief and convey sufficient detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_length`**
    - Sets the maximum length of the caption. This constraint ensures that the generated text is concise and to the point, avoiding overly verbose descriptions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`device_mode`**
    - Determines the device (CPU or GPU) on which the BLIP model will run, optimizing performance based on the available hardware.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`prefix`**
    - An optional text to prepend to the generated caption, allowing for additional context or information to be included.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`suffix`**
    - An optional text to append to the generated caption, useful for adding extra details or clarifications.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`enabled`**
    - A flag to enable or disable the caption generation feature. When disabled, it returns a default caption structure.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`blip_model`**
    - An optional pre-loaded BLIP model to be used for caption generation. If not provided, the node will load a model based on available checkpoints.
    - Comfy dtype: `BLIP_MODEL`
    - Python dtype: `torch.nn.Module`
## Output types
- **`caption`**
    - Comfy dtype: `STRING`
    - The generated captions for the input images, enriched with optional prefixes and suffixes. These captions provide a textual representation of the visual content.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)



## Source code
```python
class BlipCaption:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "min_length": (
                    "INT",
                    {
                        "default": 24,
                        "min": 0,  # minimum value
                        "max": 200,  # maximum value
                        "step": 1,  # slider's step
                    },
                ),
                "max_length": (
                    "INT",
                    {
                        "default": 48,
                        "min": 0,  # minimum value
                        "max": 200,  # maximum value
                        "step": 1,  # slider's step
                    },
                ),
            },
            "optional": {
                "device_mode": (["AUTO", "Prefer GPU", "CPU"],),
                "prefix": ("STRING", {"default": ""}),
                "suffix": ("STRING", {"default": ""}),
                "enabled": ("BOOLEAN", {"default": True}),
                "blip_model": ("BLIP_MODEL",),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("caption",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "blip_caption"
    CATEGORY = "Art Venture/Captioning"

    def blip_caption(
        self, image, min_length, max_length, device_mode="AUTO", prefix="", suffix="", enabled=True, blip_model=None
    ):
        if not enabled:
            return ([join_caption("", prefix, suffix)],)

        if blip_model is None:
            ckpts = folder_paths.get_filename_list("blip")
            if len(ckpts) == 0:
                ckpts = download_model(
                    model_path=model_dir,
                    model_url=model_url,
                    ext_filter=[".pth"],
                    download_name="model_base_caption_capfilt_large.pth",
                )
            blip_model = load_blip(ckpts[0])

        device = gpu if device_mode != "CPU" else cpu
        blip_model = blip_model.to(device)

        try:
            captions = []

            with torch.no_grad():
                for img in image:
                    img = tensor2pil(img)
                    tensor = transformImage(img)
                    caption = blip_model.generate(
                        tensor,
                        sample=False,
                        num_beams=1,
                        min_length=min_length,
                        max_length=max_length,
                    )

                    caption = join_caption(caption[0], prefix, suffix)
                    captions.append(caption)

            return (captions,)
        except:
            raise
        finally:
            if device_mode == "AUTO":
                blip_model = blip_model.to(cpu)

```
