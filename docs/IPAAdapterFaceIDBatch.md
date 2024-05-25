# Documentation
- Class name: IPAAdapterFaceIDBatch
- Category: Adapter
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAAdapterFaceIDBatch节点作为输入数据和FaceID模型之间的中介，确保高效处理批量数据。它旨在简化将FaceID模型应用于数据批量的过程，提高系统的整体性能和吞吐量。

# Input types
## Required
- input_data
    - input_data参数至关重要，因为它代表了节点将处理的图像批次。它的组织和质量直接影响节点正确应用FaceID模型并产生准确结果的能力。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- output_data
    - output_data代表将FaceID模型应用于输入批次后的处理结果。它包含了模型的预测或识别，这对于进一步分析或下游任务非常重要。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class IPAAdapterFaceIDBatch(IPAdapterFaceID):

    def __init__(self):
        self.unfold_batch = True
```