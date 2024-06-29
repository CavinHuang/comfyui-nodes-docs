# Documentation
- Class name: SeargeModelSelector
- Category: UI.CATEGORY_UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeModelSelector节点简化了选择和组合模型检查点以进行进一步处理的过程。它封装了处理各种检查点类型的复杂性，使用户能够专注于模型的分析和应用，而无需担心底层的技术细节。

# Input types
## Required
- base_checkpoint
    - base_checkpoint参数至关重要，因为它指定了作为后续操作起点的基础模型检查点。其选择影响下游任务的整体性能和准确性。
    - Comfy dtype: UI.CHECKPOINTS()
    - Python dtype: Union[str, None]
- refiner_checkpoint
    - refiner_checkpoint参数对于提升基础模型的性能至关重要。它引入了完善模型预测的可能性，从而提高了最终输出的质量。
    - Comfy dtype: UI.CHECKPOINTS_WITH_NONE()
    - Python dtype: Union[str, None]
- vae_checkpoint
    - vae_checkpoint参数在工作流程中整合变分自编码器方面起着关键作用。它使得能够整合潜在表示，这对于复杂的数据处理任务可能至关重要。
    - Comfy dtype: UI.VAE_WITH_EMBEDDED()
    - Python dtype: List[str]
## Optional
- data
    - data参数作为模型选择过程中可能需要的附加信息的容器。它在确保节点有效和高效运行中起着支持作用。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Output types
- data
    - 输出的data参数包含了模型选择过程的结果，包括组合的检查点。它是工作流程中进入后续阶段的关键组成部分，促进了进一步的分析和应用。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeModelSelector:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'base_checkpoint': (UI.CHECKPOINTS(),), 'refiner_checkpoint': (UI.CHECKPOINTS_WITH_NONE(),), 'vae_checkpoint': (UI.VAE_WITH_EMBEDDED(),)}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(base_checkpoint, refiner_checkpoint, vae_checkpoint):
        return {UI.F_BASE_CHECKPOINT: base_checkpoint, UI.F_REFINER_CHECKPOINT: refiner_checkpoint, UI.F_VAE_CHECKPOINT: vae_checkpoint}

    def get(self, base_checkpoint, refiner_checkpoint, vae_checkpoint, data=None):
        if data is None:
            data = {}
        data[UI.S_CHECKPOINTS] = self.create_dict(base_checkpoint, refiner_checkpoint, vae_checkpoint)
        return (data,)
```