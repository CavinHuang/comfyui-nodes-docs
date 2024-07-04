
# Documentation
- Class name: BRIAAI Matting
- Category: Video Matting
- Output node: False

BRIAAI Matting节点专为视频帧背景移除而设计，利用深度学习模型将前景元素与背景分离。它能够批量处理视频帧，应用复杂的神经网络架构，精确提取前景对象。该节点还提供调整背景颜色、使用FP16精度优化性能，以及处理各种输入尺寸和批处理需求的选项。

# Input types
## Required
- video_frames
    - 需要进行背景移除处理的视频帧序列。这个输入对于确定每帧中要提取的前景元素至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- version
    - 指定要使用的BRIAAI模型版本，允许根据版本灵活选择模型的功能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- fp16
    - 一个标志，表示是否使用FP16精度进行模型计算，以在兼容硬件上优化性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- bg_color
    - 用于输出帧中背景的颜色，使得可以在抠图后自定义背景外观。
    - Comfy dtype: STRING
    - Python dtype: torch.Tensor
- batch_size
    - 单批处理的帧数，影响内存使用和计算效率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从视频帧中提取的前景元素，背景已被移除或改变为指定颜色。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- mask
    - 指示每帧中前景区域的二值掩码，可用于进一步处理或分析。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BriaaiRembg:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "video_frames": ("IMAGE",),
                "version": (["v1.4"], {"default": "v1.4"}),
                "fp16": ("BOOLEAN", {"default": True}),
                "bg_color": ("STRING", {"default": "green"}),
                "batch_size": ("INT", {"min": 1, "max": 64, "default": 4})
            }
        }
    
    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "matting"
    CATEGORY = "Video Matting"


    def matting(self, video_frames, version, fp16, bg_color, batch_size, **kwargs):
        model_path = load_file_from_url(download_url, file_name=f"briaai_rmbg_{version}.pth", model_dir=CKPTS_PATH)
        model = BriaRMBG()
        model.load_state_dict(torch.load(model_path, map_location="cpu"))
        model.to(device).eval()

        video_frames, orig_num_frames, bg_color = prepare_frames_color(video_frames, bg_color, batch_size)
        bg_color = bg_color.to(device)
        orig_frame_size = video_frames.shape[2:4]
        if fp16:
            model.half()
            bg_color.half()
        
        fgrs, masks = [], []
        for i in range(video_frames.shape[0] // batch_size):
            batch_imgs = video_frames[i*batch_size:(i+1)*batch_size].to(device)
            resized_input = batch_imgs
            if fp16:
                resized_input = resized_input.half()
            resized_input = F.interpolate(resized_input, size=model_input_size, mode='bilinear')
            resized_input = normalize(resized_input,[0.5,0.5,0.5],[1.0,1.0,1.0])

            mask = model(resized_input)[0][0]
            mask = (mask-mask.min())/(mask.max()-mask.min())
            mask = F.interpolate(mask, size=orig_frame_size)

            fgr = batch_imgs * mask + bg_color * (1 - mask)
            fgrs.append(fgr.cpu())
            masks.append(mask.cpu().to(fgr.dtype))
            soft_empty_cache()
        
        fgrs = rearrange(torch.cat(fgrs), "n c h w -> n h w c")[:orig_num_frames].float().detach()
        masks = torch.cat(masks)[:orig_num_frames].squeeze(1).float().detach()
        return (fgrs, masks)

```
