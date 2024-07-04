
# Documentation
- Class name: `Robust Video Matting`
- Category: `Video Matting`
- Output node: `False`

Robust Video Matting节点旨在对视频帧进行高质量抠图，将前景元素从背景中分离出来。它利用先进的深度学习模型实现精确分割，即使在具有挑战性的条件下也能表现出色，并支持动态背景替换。

# Input types
## Required
- **`video_frames`**
    - 需要进行抠图处理的视频帧序列。这是节点操作的主要输入，用于确定前景和背景元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- **`backbone`**
    - 指定用于视频抠图的骨干模型架构，选项包括'mobilenetv3'和'resnet50'。这个选择会影响抠图过程的准确性和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- **`fp16`**
    - 一个标志，用于指示是否使用半精度浮点数（FP16）进行计算，在兼容的硬件上可能会提高性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- **`bg_color`**
    - 在将前景与原始背景分离时要应用的背景颜色，以字符串形式指定。
    - Comfy dtype: STRING
    - Python dtype: str
- **`batch_size`**
    - 单批处理的帧数，影响内存使用和处理速度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- **`image`**
    - 处理后的视频帧，背景已被替换或移除，展示前景元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- **`mask`**
    - 一个二进制掩码，指示每帧中前景元素的存在，对进一步处理或分析有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RobustVideoMatting:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "video_frames": ("IMAGE",), 
                "backbone": (["mobilenetv3", "resnet50"], {"default": "resnet50"}),
                "fp16": ("BOOLEAN", {"default": True}),
                "bg_color": ("STRING", {"default": "green"}),
                "batch_size": ("INT", {"min": 1, "max": 64, "default": 4})
            }
        }
    
    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "matting"
    CATEGORY = "Video Matting"

    def matting(self, video_frames, backbone, fp16, bg_color, batch_size):
        model_path = load_file_from_url(download_url_template.format(backbone=backbone, dtype="fp16" if fp16 else "fp32"), model_dir=CKPTS_PATH)
        model = torch.jit.load(model_path, map_location=device)
        video_frames, orig_num_frames, bg_color = prepare_frames_color(video_frames, bg_color, batch_size)
        bg_color = bg_color.to(device)
        if fp16:
            model.half()
            bg_color.half()
        model = torch.jit.freeze(model)
        rec, fgrs, masks = [None] * 4, [], []
        for i in range(video_frames.shape[0] // batch_size):
            input = video_frames[i*batch_size:(i+1)*batch_size].to(device)
            if fp16:
                input = input.half()
            fgr, pha, *rec = model(input, *rec, auto_downsample_ratio(*video_frames.shape[2:]))
            mask = pha.gt(0) #Remove blur
            fgr = fgr * mask + bg_color * ~mask
            fgrs.append(fgr.cpu())
            masks.append(mask.cpu().to(fgr.dtype))
            soft_empty_cache()
        fgrs = rearrange(torch.cat(fgrs, dim=0), "n c h w -> n h w c")[:orig_num_frames].detach().float()
        masks = torch.cat(masks, dim=0).squeeze(1)[:orig_num_frames].detach().float()
        soft_empty_cache()
        return (fgrs, masks)

```
