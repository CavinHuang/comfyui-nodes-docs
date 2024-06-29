# Documentation
- Class name: WAS_Samples_Passthrough_Stat_System
- Category: WAS Suite/Debug
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Samples_Passthrough_Stat_System 类的 `stat_system` 方法旨在提供系统当前状态的统计概览。它捕获并记录关键的系统指标，如 RAM 和 VRAM 使用情况以及硬盘空间利用率。此方法对于监控系统的健康状况和性能至关重要，提供了对资源消耗的洞察，而无需深入了解底层数据收集过程的具体细节。

# Input types
## Required
- samples
    - “samples”参数对于执行 `stat_system` 方法至关重要，因为它代表了系统操作的潜在空间样本。正是通过这些样本，评估了系统的资源利用率，使这个参数成为节点功能不可或缺的一部分。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]

# Output types
- samples
    - “samples”输出参数表示通过系统传递的原始潜在空间样本。它作为系统已处理输入且未发生更改的确认，保证了数据的完整性，以便进一步使用或分析。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Samples_Passthrough_Stat_System:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'samples': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    RETURN_NAMES = ('samples',)
    FUNCTION = 'stat_system'
    CATEGORY = 'WAS Suite/Debug'

    def stat_system(self, samples):
        log = ''
        for stat in self.get_system_stats():
            log += stat + '\n'
        cstr('\n' + log).msg.print()
        return (samples,)

    def get_system_stats(self):
        import psutil
        ram = psutil.virtual_memory()
        ram_used = ram.used / 1024 ** 3
        ram_total = ram.total / 1024 ** 3
        ram_stats = f'Used RAM: {ram_used:.2f} GB / Total RAM: {ram_total:.2f} GB'
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        vram_used = torch.cuda.memory_allocated(device) / 1024 ** 3
        vram_total = torch.cuda.get_device_properties(device).total_memory / 1024 ** 3
        vram_stats = f'Used VRAM: {vram_used:.2f} GB / Total VRAM: {vram_total:.2f} GB'
        hard_drive = psutil.disk_usage('/')
        used_space = hard_drive.used / 1024 ** 3
        total_space = hard_drive.total / 1024 ** 3
        hard_drive_stats = f'Used Space: {used_space:.2f} GB / Total Space: {total_space:.2f} GB'
        return [ram_stats, vram_stats, hard_drive_stats]
```