# Documentation
- Class name: LatentRebatch
- Category: latent/batch
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentRebatch节点旨在高效管理和重新组织潜在表示成批次。它在准备数据以进行进一步处理中起着关键作用，通过确保潜在表示根据指定的大小正确地批量处理，这对于后续计算任务的性能至关重要。

# Input types
## Required
- latents
    - 'latents'参数是一个字典列表，其中每个字典包含潜在表示和相关的元数据。此参数至关重要，因为它作为节点的主要输入，决定了将被批量处理和处理的数据。
    - Comfy dtype: List[Dict[str, Union[torch.Tensor, int]]]
    - Python dtype: List[Dict[str, Union[torch.Tensor, int]]]
- batch_size
    - 'batch_size'参数定义了将从输入latents创建的每个批次的大小。它是一个关键参数，因为它直接影响批量处理过程的效率和吞吐量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output_list
    - 'output_list'包含重新组织的latents批次。每个批次是一个字典，包括'samples'、'noise_mask'和'batch_index'，代表重新批量处理的结果。这个输出很重要，因为它使得工作流程的后续阶段能够在结构化和适当大小的数据上操作。
    - Comfy dtype: List[Dict[str, Union[torch.Tensor, List[int]]]]
    - Python dtype: List[Dict[str, Union[torch.Tensor, List[int]]]]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentRebatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latents': ('LATENT',), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096})}}
    RETURN_TYPES = ('LATENT',)
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'rebatch'
    CATEGORY = 'latent/batch'

    @staticmethod
    def get_batch(latents, list_ind, offset):
        """prepare a batch out of the list of latents"""
        samples = latents[list_ind]['samples']
        shape = samples.shape
        mask = latents[list_ind]['noise_mask'] if 'noise_mask' in latents[list_ind] else torch.ones((shape[0], 1, shape[2] * 8, shape[3] * 8), device='cpu')
        if mask.shape[-1] != shape[-1] * 8 or mask.shape[-2] != shape[-2]:
            torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(shape[-2] * 8, shape[-1] * 8), mode='bilinear')
        if mask.shape[0] < samples.shape[0]:
            mask = mask.repeat((shape[0] - 1) // mask.shape[0] + 1, 1, 1, 1)[:shape[0]]
        if 'batch_index' in latents[list_ind]:
            batch_inds = latents[list_ind]['batch_index']
        else:
            batch_inds = [x + offset for x in range(shape[0])]
        return (samples, mask, batch_inds)

    @staticmethod
    def get_slices(indexable, num, batch_size):
        """divides an indexable object into num slices of length batch_size, and a remainder"""
        slices = []
        for i in range(num):
            slices.append(indexable[i * batch_size:(i + 1) * batch_size])
        if num * batch_size < len(indexable):
            return (slices, indexable[num * batch_size:])
        else:
            return (slices, None)

    @staticmethod
    def slice_batch(batch, num, batch_size):
        result = [LatentRebatch.get_slices(x, num, batch_size) for x in batch]
        return list(zip(*result))

    @staticmethod
    def cat_batch(batch1, batch2):
        if batch1[0] is None:
            return batch2
        result = [torch.cat((b1, b2)) if torch.is_tensor(b1) else b1 + b2 for (b1, b2) in zip(batch1, batch2)]
        return result

    def rebatch(self, latents, batch_size):
        batch_size = batch_size[0]
        output_list = []
        current_batch = (None, None, None)
        processed = 0
        for i in range(len(latents)):
            next_batch = self.get_batch(latents, i, processed)
            processed += len(next_batch[2])
            if current_batch[0] is None:
                current_batch = next_batch
            elif next_batch[0].shape[-1] != current_batch[0].shape[-1] or next_batch[0].shape[-2] != current_batch[0].shape[-2]:
                (sliced, _) = self.slice_batch(current_batch, 1, batch_size)
                output_list.append({'samples': sliced[0][0], 'noise_mask': sliced[1][0], 'batch_index': sliced[2][0]})
                current_batch = next_batch
            else:
                current_batch = self.cat_batch(current_batch, next_batch)
            if current_batch[0].shape[0] > batch_size:
                num = current_batch[0].shape[0] // batch_size
                (sliced, remainder) = self.slice_batch(current_batch, num, batch_size)
                for i in range(num):
                    output_list.append({'samples': sliced[0][i], 'noise_mask': sliced[1][i], 'batch_index': sliced[2][i]})
                current_batch = remainder
        if current_batch[0] is not None:
            (sliced, _) = self.slice_batch(current_batch, 1, batch_size)
            output_list.append({'samples': sliced[0][0], 'noise_mask': sliced[1][0], 'batch_index': sliced[2][0]})
        for s in output_list:
            if s['noise_mask'].mean() == 1.0:
                del s['noise_mask']
        return (output_list,)
```