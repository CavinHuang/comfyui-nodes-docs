# Samples Passthrough (Stat System)
## Documentation
- Class name: `Samples Passthrough (Stat System)`
- Category: `WAS Suite/Debug`
- Output node: `False`

This node is designed to pass through sample data without modification, primarily serving as a placeholder or intermediary within a statistical analysis or processing pipeline. Its main function is to facilitate the flow of data between nodes in a system that requires the preservation of sample integrity for further analysis or processing.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the data that will be passed through the node without alteration. It is crucial for maintaining the integrity and continuity of data across different stages of a processing pipeline.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`samples`**
    - Comfy dtype: `LATENT`
    - The output of this node is identical to its input, ensuring that the sample data is preserved without any modifications for subsequent processing or analysis.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Samples_Passthrough_Stat_System:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "samples": ("LATENT",),
            }
        }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("samples",)
    FUNCTION = "stat_system"

    CATEGORY = "WAS Suite/Debug"

    def stat_system(self, samples):

        log = ""
        for stat in self.get_system_stats():
            log += stat + "\n"

        cstr("\n"+log).msg.print()

        return (samples,)

    def get_system_stats(self):

        import psutil

        # RAM
        ram = psutil.virtual_memory()
        ram_used = ram.used / (1024 ** 3)
        ram_total = ram.total / (1024 ** 3)
        ram_stats = f"Used RAM: {ram_used:.2f} GB / Total RAM: {ram_total:.2f} GB"

        # VRAM (with PyTorch)
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        vram_used = torch.cuda.memory_allocated(device) / (1024 ** 3)
        vram_total = torch.cuda.get_device_properties(device).total_memory / (1024 ** 3)
        vram_stats = f"Used VRAM: {vram_used:.2f} GB / Total VRAM: {vram_total:.2f} GB"

        # Hard Drive Space
        hard_drive = psutil.disk_usage("/")
        used_space = hard_drive.used / (1024 ** 3)
        total_space = hard_drive.total / (1024 ** 3)
        hard_drive_stats = f"Used Space: {used_space:.2f} GB / Total Space: {total_space:.2f} GB"

        return [ram_stats, vram_stats, hard_drive_stats]

```
