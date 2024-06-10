---
tags:
- Segmentation
---

# ISNet Segment
## Documentation
- Class name: `ISNetSegment`
- Category: `Art Venture/Segmentation`
- Output node: `False`

ISNetSegment is designed for image segmentation using the ISNet model, capable of processing images to separate foreground from background based on a specified threshold. It supports dynamic model loading, device selection, and optional operation enabling for flexible integration into image processing pipelines.
## Input types
### Required
- **`images`**
    - Images to be segmented; the core data for segmentation operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - The threshold value for segmentation; determines the sensitivity of the segmentation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`device_mode`**
    - Specifies the computation device preference ('AUTO', 'Prefer GPU', 'CPU') for the segmentation task, allowing for optimized performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`enabled`**
    - A flag to enable or disable the segmentation process, providing control over the execution flow.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`isnet_model`**
    - An optional ISNet model parameter for segmentation; allows for custom model usage if provided.
    - Comfy dtype: `ISNET_MODEL`
    - Python dtype: `ISNetBase | ISNetDIS`
## Output types
- **`segmented`**
    - Comfy dtype: `IMAGE`
    - The segmented images, where the foreground is separated from the background.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The binary masks indicating the segmented areas in the images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ISNetSegment:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "threshold": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.001}),
            },
            "optional": {
                "device_mode": (["AUTO", "Prefer GPU", "CPU"],),
                "enabled": ("BOOLEAN", {"default": True}),
                "isnet_model": ("ISNET_MODEL",),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    RETURN_NAMES = ("segmented", "mask")
    CATEGORY = "Art Venture/Segmentation"
    FUNCTION = "segment_isnet"

    def segment_isnet(self, images: torch.Tensor, threshold, device_mode="AUTO", enabled=True, isnet_model=None):
        if not enabled:
            masks = torch.zeros((len(images), 64, 64), dtype=torch.float32)
            return (images, masks)

        if isnet_model is None:
            ckpts = folder_paths.get_filename_list("isnet")
            if len(ckpts) == 0:
                ckpts = download_model(
                    model_path=model_dir,
                    model_url=model_url,
                    ext_filter=[".pth"],
                    download_name="isnet-general-use.pth",
                )
            isnet_model = load_isnet_model(ckpts[0])

        device = gpu if device_mode != "CPU" else cpu
        isnet_model = isnet_model.to(device)

        try:
            segments = []
            masks = []
            for image in images:
                im, im_orig_size = im_preprocess(image, cache_size)
                mask = predict(isnet_model, im, im_orig_size, device)
                mask = mask / 255.0
                mask = np.clip(mask > threshold, 0, 1).astype(np.float32)
                mask = torch.from_numpy(mask).float()
                masks.append(mask)

                mask = tensor2pil(mask, "L")
                cropped = tensor2pil(image, "RGB")
                cropped.putalpha(mask)
                segments.append(pil2tensor(cropped))

            return (torch.cat(segments, dim=0), torch.stack(masks))
        finally:
            if device_mode == "AUTO":
                isnet_model = isnet_model.to(cpu)

```
