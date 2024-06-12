---
tags:
- DataVisualization
- XYPlotData
---

# Manual XY Entry Info
## Documentation
- Class name: `Manual XY Entry Info`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node is designed to provide detailed information about manual entries for XY plots within a specific context, facilitating the understanding and manipulation of XY data for customized plotting and analysis.
## Input types
### Required
- **`notes`**
    - The 'notes' input allows users to provide additional context or information related to the manual XY entries, enhancing the customization and specificity of the plotting process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Manual_XY_Entry_Info:

    syntax = "(X/Y_types)     (X/Y_values)\n" \
               "Seeds++ Batch   batch_count\n" \
               "Steps           steps_1;steps_2;...\n" \
               "StartStep       start_step_1;start_step_2;...\n" \
               "EndStep         end_step_1;end_step_2;...\n" \
               "CFG Scale       cfg_1;cfg_2;...\n" \
               "Sampler(1)      sampler_1;sampler_2;...\n" \
               "Sampler(2)      sampler_1,scheduler_1;...\n" \
               "Sampler(3)      sampler_1;...;,default_scheduler\n" \
               "Scheduler       scheduler_1;scheduler_2;...\n" \
               "Denoise         denoise_1;denoise_2;...\n" \
               "VAE             vae_1;vae_2;vae_3;...\n" \
               "+Prompt S/R     search_txt;replace_1;replace_2;...\n" \
               "-Prompt S/R     search_txt;replace_1;replace_2;...\n" \
               "Checkpoint(1)   ckpt_1;ckpt_2;ckpt_3;...\n" \
               "Checkpoint(2)   ckpt_1,clip_skip_1;...\n" \
               "Checkpoint(3)   ckpt_1;ckpt_2;...;,default_clip_skip\n" \
               "Clip Skip       clip_skip_1;clip_skip_2;...\n" \
               "LoRA(1)         lora_1;lora_2;lora_3;...\n" \
               "LoRA(2)         lora_1;...;,default_model_str,default_clip_str\n" \
               "LoRA(3)         lora_1,model_str_1,clip_str_1;..."

    @classmethod
    def INPUT_TYPES(cls):
        samplers = ";\n".join(comfy.samplers.KSampler.SAMPLERS)
        schedulers = ";\n".join(comfy.samplers.KSampler.SCHEDULERS)
        vaes = ";\n".join(folder_paths.get_filename_list("vae"))
        ckpts = ";\n".join(folder_paths.get_filename_list("checkpoints"))
        loras = ";\n".join(folder_paths.get_filename_list("loras"))
        return {"required": {
            "notes": ("STRING", {"default":
                                    f"_____________SYNTAX_____________\n{cls.syntax}\n\n"
                                    f"____________SAMPLERS____________\n{samplers}\n\n"
                                    f"___________SCHEDULERS___________\n{schedulers}\n\n"
                                    f"_____________VAES_______________\n{vaes}\n\n"
                                    f"___________CHECKPOINTS__________\n{ckpts}\n\n"
                                    f"_____________LORAS______________\n{loras}\n","multiline": True}),},}

    RETURN_TYPES = ()
    CATEGORY = "Efficiency Nodes/XY Inputs"

```
