
# Documentation
- Class name: ISNetSegment
- Category: Art Venture/Segmentation
- Output node: False

ISNetSegment是一个使用ISNet模型进行图像分割的节点。它能够根据指定的阈值处理图像，将前景与背景分离。该节点支持动态模型加载、设备选择，并可选择性地启用操作，从而灵活地集成到图像处理流程中。

# Input types
## Required
- images
    - 需要进行分割的图像，是分割操作的核心数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- threshold
    - 分割的阈值，决定了分割过程的敏感度。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- device_mode
    - 指定分割任务的计算设备偏好（'AUTO'、'Prefer GPU'、'CPU'），以实现性能优化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- enabled
    - 控制是否启用分割过程的标志，提供了对执行流程的控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- isnet_model
    - 可选的ISNet模型参数，用于分割。如果提供，允许使用自定义模型。
    - Comfy dtype: ISNET_MODEL
    - Python dtype: ISNetBase | ISNetDIS

# Output types
- segmented
    - 分割后的图像，其中前景与背景已分离。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 指示图像中分割区域的二值掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


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
