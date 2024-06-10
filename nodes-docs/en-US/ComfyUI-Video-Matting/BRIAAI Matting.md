---
tags:
- BackgroundRemoval
- Image
---

# BRIAAI Matting
## Documentation
- Class name: `BRIAAI Matting`
- Category: `Video Matting`
- Output node: `False`

The BRIAAI Matting node is designed for video frame background removal, leveraging deep learning models to separate foreground elements from their backgrounds. It processes video frames in batches, applying a sophisticated neural network architecture to accurately extract foreground objects with the option to adjust the background color, optimize for performance with FP16 precision, and handle various input sizes and batch processing requirements.
## Input types
### Required
- **`video_frames`**
    - The sequence of video frames to be processed for background removal. This input is crucial for determining the foreground elements to be extracted from each frame.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`version`**
    - Specifies the version of the BRIAAI model to be used, allowing for flexibility in choosing the model's capabilities based on its version.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`fp16`**
    - A flag indicating whether to use FP16 precision for model computations, optimizing performance on compatible hardware.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`bg_color`**
    - The color to be used for the background in the output frames, enabling customization of the background appearance post-matting.
    - Comfy dtype: `STRING`
    - Python dtype: `torch.Tensor`
- **`batch_size`**
    - The number of frames to process in a single batch, affecting memory usage and computational efficiency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The foreground elements extracted from the video frames, with the background removed or altered to the specified color.
    - Python dtype: `List[torch.Tensor]`
- **`mask`**
    - Comfy dtype: `MASK`
    - The binary masks indicating the foreground regions in each frame, useful for further processing or analysis.
    - Python dtype: `List[torch.Tensor]`
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
