---
tags:
- AnimationScheduling
- FrameInterpolation
- VisualEffects
---

# STMFNet VFI
## Documentation
- Class name: `STMFNet VFI`
- Category: `ComfyUI-Frame-Interpolation/VFI`
- Output node: `False`

STMFNet_VFI specializes in enhancing video sequences through frame interpolation, utilizing advanced neural network models to accurately predict and insert intermediate frames. This process aims to increase the frame rate of videos, resulting in smoother playback and improved visual quality.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model, determining the specific pre-trained weights to be used for frame interpolation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`frames`**
    - Represents the sequence of video frames to be interpolated. This input is crucial for determining the starting and ending points of interpolation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`clear_cache_after_n_frames`**
    - Controls the frequency of cache clearing to manage memory usage during the interpolation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`multiplier`**
    - Defines the factor by which the frame rate is to be increased, directly influencing the number of frames to be interpolated.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`duplicate_first_last_frames`**
    - A boolean flag indicating whether to duplicate the first and last frames, affecting the output video's length and smoothness.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`optional_interpolation_states`**
    - Allows for the specification of custom interpolation states, offering flexibility in handling frame skipping and other advanced interpolation scenarios.
    - Comfy dtype: `INTERPOLATION_STATES`
    - Python dtype: `InterpolationStateList`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output consists of the interpolated video frames, enhancing the original sequence with additional frames to achieve smoother motion.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)



## Source code
```python
class STMFNet_VFI:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (["stmfnet.pth"], ),
                "frames": ("IMAGE", ),
                "clear_cache_after_n_frames": ("INT", {"default": 10, "min": 1, "max": 1000}),
                "multiplier": ("INT", {"default": 2, "min": 2, "max": 2}), #TODO: Implement recursively invoking interpolator for multi-frame interpolation
                "duplicate_first_last_frames": ("BOOLEAN", {"default": False})
            },
            "optional": {
                "optional_interpolation_states": ("INTERPOLATION_STATES", )
            }
        }
    
    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "vfi"
    CATEGORY = "ComfyUI-Frame-Interpolation/VFI"        

    #Reference: https://github.com/danier97/ST-MFNet/blob/main/interpolate_yuv.py#L93
    def vfi(
        self,
        ckpt_name: typing.AnyStr,
        frames: torch.Tensor,
        clear_cache_after_n_frames = 10,
        multiplier: typing.SupportsInt = 2,
        duplicate_first_last_frames: bool = False,
        optional_interpolation_states: InterpolationStateList = None,
        **kwargs
    ):
        from .stmfnet_arch import STMFNet_Model
        if multiplier != 2:
            warnings.warn("Currently, ST-MFNet only supports 2x interpolation. The process will continue but please set multiplier=2 afterward")

        assert_batch_size(frames, batch_size=4, vfi_name="ST-MFNet")
        interpolation_states = optional_interpolation_states
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        model = STMFNet_Model()
        model.load_state_dict(torch.load(model_path))
        model = model.eval().to(device)

        frames = preprocess_frames(frames)
        number_of_frames_processed_since_last_cleared_cuda_cache = 0
        output_frames = []
        for frame_itr in range(len(frames) - 3):
            #Does skipping frame i+1 make sanse in this case?
            if interpolation_states is not None and interpolation_states.is_frame_skipped(frame_itr) and interpolation_states.is_frame_skipped(frame_itr + 1):
                continue
            
            #Ensure that input frames are in fp32 - the same dtype as model
            frame0, frame1, frame2, frame3 = (
                frames[frame_itr:frame_itr+1].float(),
                frames[frame_itr+1:frame_itr+2].float(), 
                frames[frame_itr+2:frame_itr+3].float(), 
                frames[frame_itr+3:frame_itr+4].float()
            )
            new_frame = model(frame0.to(device), frame1.to(device), frame2.to(device), frame3.to(device)).detach().cpu()
            number_of_frames_processed_since_last_cleared_cuda_cache += 2
            
            if frame_itr == 0:
                output_frames.append(frame0)
                if duplicate_first_last_frames:
                    output_frames.append(frame0) # repeat the first frame
                output_frames.append(frame1)
            output_frames.append(new_frame)
            output_frames.append(frame2)
            if frame_itr == len(frames) - 4:
                output_frames.append(frame3)
                if duplicate_first_last_frames:
                    output_frames.append(frame3) # repeat the last frame

            # Try to avoid a memory overflow by clearing cuda cache regularly
            if number_of_frames_processed_since_last_cleared_cuda_cache >= clear_cache_after_n_frames:
                print("Comfy-VFI: Clearing cache...")
                soft_empty_cache()
                number_of_frames_processed_since_last_cleared_cuda_cache = 0
                print("Comfy-VFI: Done cache clearing")
            gc.collect()
        
        dtype = torch.float32
        output_frames = [frame.cpu().to(dtype=dtype) for frame in output_frames] #Ensure all frames are in cpu
        out = torch.cat(output_frames, dim=0)
        # clear cache for courtesy
        print("Comfy-VFI: Final clearing cache...")
        soft_empty_cache()
        print("Comfy-VFI: Done cache clearing")
        return (postprocess_frames(out), )

```
