---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# MarigoldDepthEstimation
## Documentation
- Class name: `MarigoldDepthEstimation`
- Category: `Marigold`
- Output node: `False`

The MarigoldDepthEstimation node is designed for generating depth maps from single images using a diffusion-based monocular depth estimation technique. It leverages the Marigold model to produce depth maps that can be further processed or visualized. This node is capable of handling both individual images and sequences for video applications, incorporating advanced features like ensembling for improved depth map accuracy and optical flow for video frame consistency.
## Input types
### Required
- **`image`**
    - The input image for which the depth map is to be generated. This is the primary input that drives the depth estimation process, directly influencing the output's appearance and quality.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`seed`**
    - Sets the random seed for depth map generation, ensuring reproducibility of results. This parameter allows for consistent outputs across multiple runs, facilitating comparisons and evaluations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise_steps`**
    - Specifies the number of steps per depth map to increase accuracy at the cost of processing time. This parameter directly influences the trade-off between the depth map's detail and the computational time required, impacting the overall execution time and the quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`n_repeat`**
    - Determines the amount of iterations to be ensembled into a single depth map, affecting the final depth map's accuracy and detail. The higher the number, the more refined the depth map, at the expense of increased processing time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`regularizer_strength`**
    - Adjusts the strength of the regularization during the ensembling process, typically left at default settings. While generally not modified, it can be adjusted to fine-tune the depth map's clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`reduction_method`**
    - Specifies the method used for reducing the ensemble of depth maps into a single map. This choice impacts how the individual depth maps are combined, affecting the final image's quality and detail.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`max_iter`**
    - Sets the maximum number of iterations for the ensembling process. This parameter controls how long the ensembling process can run, impacting the depth map's refinement level.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tol`**
    - The tolerance level for the ensembling process, affecting when the process is considered complete. A lower tolerance can lead to a more detailed depth map but may increase processing time.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`invert`**
    - Inverts the default depth map colors for compatibility with certain applications. This parameter is essential for ensuring the depth map's visual representation matches the expected format for further processing.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`keep_model_loaded`**
    - Determines whether the depth estimation model remains loaded between invocations. Keeping the model loaded can significantly reduce processing time for subsequent images at the expense of increased memory usage.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`n_repeat_batch_size`**
    - Controls how many of the n_repeats are processed as a batch, optimizing VRAM usage and processing speed. This parameter is crucial for managing resource utilization effectively, especially on systems with limited VRAM.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`use_fp16`**
    - Determines whether to use fp16 precision for reduced VRAM usage, with a potential impact on quality. This parameter is crucial for balancing between resource efficiency and the depth map's fidelity.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`scheduler`**
    - Chooses the scheduler for the depth estimation process, affecting the outcome's nuances. Different schedulers can lead to variations in the depth map's appearance and accuracy, providing flexibility in the results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`normalize`**
    - Controls whether the output depth map is normalized. Normalization can affect the depth map's visual representation, making it more suitable for certain types of post-processing or visualization.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`model`**
    - Selects between the Marigold model and its LCM version for depth estimation, influencing the depth map's characteristics. The choice of model affects the depth map's accuracy and the visual quality of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`ensembled_image`**
    - Comfy dtype: `IMAGE`
    - The final ensembled depth map image, ready for further processing or visualization. This output represents the culmination of the depth estimation process, incorporating all adjustments and refinements specified through the input parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MarigoldDepthEstimation:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {  
            "image": ("IMAGE", ),
            "seed": ("INT", {"default": 123,"min": 0, "max": 0xffffffffffffffff, "step": 1}),
            "denoise_steps": ("INT", {"default": 10, "min": 1, "max": 4096, "step": 1}),
            "n_repeat": ("INT", {"default": 10, "min": 1, "max": 4096, "step": 1}),
            "regularizer_strength": ("FLOAT", {"default": 0.02, "min": 0.001, "max": 4096, "step": 0.001}),
            "reduction_method": (
            [   
                'median',
                'mean',  
            ], {
               "default": 'median'
            }),
            "max_iter": ("INT", {"default": 5, "min": 1, "max": 4096, "step": 1}),
            "tol": ("FLOAT", {"default": 1e-3, "min": 1e-6, "max": 1e-1, "step": 1e-6}),
            
            "invert": ("BOOLEAN", {"default": True}),
            "keep_model_loaded": ("BOOLEAN", {"default": True}),
            "n_repeat_batch_size": ("INT", {"default": 2, "min": 1, "max": 4096, "step": 1}),
            "use_fp16": ("BOOLEAN", {"default": True}),
            "scheduler": (
            [   
                'DDIMScheduler',
                'DDPMScheduler',
                'PNDMScheduler',
                'DEISMultistepScheduler',
                'LCMScheduler',
            ], {
               "default": 'DDIMScheduler'
            }),
            "normalize": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "model": (
            [   
                'Marigold',
                'marigold-lcm-v1-0',  
            ], {
               "default": 'Marigold'
            }),
            }
            
            }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES =("ensembled_image",)
    FUNCTION = "process"
    CATEGORY = "Marigold"
    DESCRIPTION = """
Diffusion-based monocular depth estimation:  
https://github.com/prs-eth/Marigold  
  
- denoise_steps: steps per depth map, increase for accuracy in exchange of processing time
- n_repeat: amount of iterations to be ensembled into single depth map
- n_repeat_batch_size: how many of the n_repeats are processed as a batch,  
if you have the VRAM this can match the n_repeats for faster processing  
- model: Marigold or it's LCM version marigold-lcm-v1-0  
For the LCM model use around 4 steps and the LCMScheduler  
- scheduler: Different schedulers give bit different results  
- invert: marigold by default produces depth map where black is front,  
for controlnets etc. we want the opposite.  
- regularizer_strength, reduction_method, max_iter, tol (tolerance) are settings   
for the ensembling process, generally do not touch.  
- use_fp16: if true, use fp16, if false use fp32  
fp16 uses much less VRAM, but in some cases can lead to loss of quality.  
"""

    def process(self, image, seed, denoise_steps, n_repeat, regularizer_strength, reduction_method, max_iter, tol,invert, keep_model_loaded, n_repeat_batch_size, use_fp16, scheduler, normalize, model="Marigold"):
        batch_size = image.shape[0]
        precision = torch.float16 if use_fp16 else torch.float32
        device = comfy.model_management.get_torch_device()
        torch.manual_seed(seed)

        image = image.permute(0, 3, 1, 2).to(device).to(dtype=precision)
        if normalize:
            image = image * 2.0 - 1.0

        diffusers_model_path = os.path.join(folder_paths.models_dir,'diffusers')
        #load the diffusers model
        if model == "Marigold":
            folders_to_check = [
                os.path.join(script_directory,"checkpoints","Marigold_v1_merged",),
                os.path.join(script_directory,"checkpoints","Marigold",),
                os.path.join(diffusers_model_path,"Marigold_v1_merged"),
                os.path.join(diffusers_model_path,"Marigold")
            ]
        elif model == "marigold-lcm-v1-0":
            folders_to_check = [
                os.path.join(diffusers_model_path,"marigold-lcm-v1-0"),
                os.path.join(diffusers_model_path,"checkpoints","marigold-lcm-v1-0")
            ]
        self.custom_config = {
            "model": model,
            "use_fp16": use_fp16,
            "scheduler": scheduler,
        }
        if not hasattr(self, 'marigold_pipeline') or self.marigold_pipeline is None or self.current_config != self.custom_config:
            self.current_config = self.custom_config
            # Load the model only if it hasn't been loaded before
            checkpoint_path = None
            for folder in folders_to_check:
                if os.path.exists(folder):
                    checkpoint_path = folder
                    break
            to_ignore = ["*.bin", "*fp16*"]

            if checkpoint_path is None:
                if model == "Marigold":
                    try:
                        from huggingface_hub import snapshot_download
                        checkpoint_path = os.path.join(diffusers_model_path, "Marigold")
                        snapshot_download(repo_id="Bingxin/Marigold", ignore_patterns=to_ignore, local_dir=checkpoint_path, local_dir_use_symlinks=False)  
                    except:
                        raise FileNotFoundError(f"No checkpoint directory found at {checkpoint_path}")
                if model == "marigold-lcm-v1-0":
                    try:
                        from huggingface_hub import snapshot_download
                        checkpoint_path = os.path.join(diffusers_model_path, "marigold-lcm-v1-0")
                        snapshot_download(repo_id="prs-eth/marigold-lcm-v1-0", ignore_patterns=to_ignore, local_dir=checkpoint_path, local_dir_use_symlinks=False)  
                    except:
                        raise FileNotFoundError(f"No checkpoint directory found at {checkpoint_path}")

            self.marigold_pipeline = MarigoldPipeline.from_pretrained(checkpoint_path, enable_xformers=False, empty_text_embed=empty_text_embed, noise_scheduler_type=scheduler)
            self.marigold_pipeline = self.marigold_pipeline.to(device).half() if use_fp16 else self.marigold_pipeline.to(device)
            self.marigold_pipeline.unet.eval()  # Set the model to evaluation mode
        pbar = comfy.utils.ProgressBar(batch_size * n_repeat)

        out = []

        with torch.no_grad():
            for i in range(batch_size):
                # Duplicate the current image n_repeat times
                duplicated_batch = image[i].unsqueeze(0).repeat(n_repeat, 1, 1, 1)
                
                # Process the duplicated batch in sub-batches
                depth_maps = []
                for j in range(0, n_repeat, n_repeat_batch_size):
                    # Get the current sub-batch
                    sub_batch = duplicated_batch[j:j + n_repeat_batch_size]
                    
                    # Process the sub-batch
                    depth_maps_sub_batch = self.marigold_pipeline(sub_batch, num_inference_steps=denoise_steps, show_pbar=False)
                    
                    # Process each depth map in the sub-batch if necessary
                    for depth_map in depth_maps_sub_batch:
                        depth_map = torch.clip(depth_map, -1.0, 1.0)
                        depth_map = (depth_map + 1.0) / 2.0
                        depth_maps.append(depth_map)
                        pbar.update(1)
                
                depth_predictions = torch.cat(depth_maps, dim=0).squeeze()
                del duplicated_batch, depth_maps_sub_batch
                torch.cuda.empty_cache()  # clear vram cache for ensembling

                # Test-time ensembling
                if n_repeat > 1:
                    depth_map, pred_uncert = ensemble_depths(
                        depth_predictions,
                        regularizer_strength=regularizer_strength,
                        max_iter=max_iter,
                        tol=tol,
                        reduction=reduction_method,
                        max_res=None,
                        device=device,
                    )
                    print(depth_map.shape)
                    depth_map = depth_map.unsqueeze(2).repeat(1, 1, 3)
                    print(depth_map.shape)
                else:
                    depth_map = depth_map.permute(1, 2, 0)
                    depth_map = depth_map.repeat(1, 1, 3)
                    print(depth_map.shape)
                
                out.append(depth_map)
                del depth_map, depth_predictions
      
        if invert:
            outstack = 1.0 - torch.stack(out, dim=0).cpu().to(torch.float32)
        else:
            outstack = torch.stack(out, dim=0).cpu().to(torch.float32)

        if not keep_model_loaded:
            self.marigold_pipeline = None
            comfy.model_management.soft_empty_cache()
        return (outstack,)

```
