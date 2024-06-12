---
tags:
- Batch
- Image
---

# Rebatch Latents
## Documentation
- Class name: `RebatchLatents`
- Category: `latent/batch`
- Output node: `False`

The RebatchLatents node is designed to reorganize a batch of latent representations into a new batch configuration, based on a specified batch size. It ensures that the latent samples are grouped appropriately, handling variations in dimensions and sizes, to facilitate further processing or model inference.
## Input types
### Required
- **`latents`**
    - The 'latents' parameter represents the input latent representations to be rebatched. It is crucial for determining the structure and content of the output batch.
    - Comfy dtype: `LATENT`
    - Python dtype: `List[Dict[str, torch.Tensor]]`
- **`batch_size`**
    - The 'batch_size' parameter specifies the desired number of samples per batch in the output. It directly influences the grouping and division of the input latents into new batches.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a reorganized batch of latent representations, adjusted according to the specified batch size. It facilitates further processing or analysis.
    - Python dtype: `List[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)



## Source code
```python
class LatentRebatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "latents": ("LATENT",),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
                              }}
    RETURN_TYPES = ("LATENT",)
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, )

    FUNCTION = "rebatch"

    CATEGORY = "latent/batch"

    @staticmethod
    def get_batch(latents, list_ind, offset):
        '''prepare a batch out of the list of latents'''
        samples = latents[list_ind]['samples']
        shape = samples.shape
        mask = latents[list_ind]['noise_mask'] if 'noise_mask' in latents[list_ind] else torch.ones((shape[0], 1, shape[2]*8, shape[3]*8), device='cpu')
        if mask.shape[-1] != shape[-1] * 8 or mask.shape[-2] != shape[-2]:
            torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(shape[-2]*8, shape[-1]*8), mode="bilinear")
        if mask.shape[0] < samples.shape[0]:
            mask = mask.repeat((shape[0] - 1) // mask.shape[0] + 1, 1, 1, 1)[:shape[0]]
        if 'batch_index' in latents[list_ind]:
            batch_inds = latents[list_ind]['batch_index']
        else:
            batch_inds = [x+offset for x in range(shape[0])]
        return samples, mask, batch_inds

    @staticmethod
    def get_slices(indexable, num, batch_size):
        '''divides an indexable object into num slices of length batch_size, and a remainder'''
        slices = []
        for i in range(num):
            slices.append(indexable[i*batch_size:(i+1)*batch_size])
        if num * batch_size < len(indexable):
            return slices, indexable[num * batch_size:]
        else:
            return slices, None
    
    @staticmethod
    def slice_batch(batch, num, batch_size):
        result = [LatentRebatch.get_slices(x, num, batch_size) for x in batch]
        return list(zip(*result))

    @staticmethod
    def cat_batch(batch1, batch2):
        if batch1[0] is None:
            return batch2
        result = [torch.cat((b1, b2)) if torch.is_tensor(b1) else b1 + b2 for b1, b2 in zip(batch1, batch2)]
        return result

    def rebatch(self, latents, batch_size):
        batch_size = batch_size[0]

        output_list = []
        current_batch = (None, None, None)
        processed = 0

        for i in range(len(latents)):
            # fetch new entry of list
            #samples, masks, indices = self.get_batch(latents, i)
            next_batch = self.get_batch(latents, i, processed)
            processed += len(next_batch[2])
            # set to current if current is None
            if current_batch[0] is None:
                current_batch = next_batch
            # add previous to list if dimensions do not match
            elif next_batch[0].shape[-1] != current_batch[0].shape[-1] or next_batch[0].shape[-2] != current_batch[0].shape[-2]:
                sliced, _ = self.slice_batch(current_batch, 1, batch_size)
                output_list.append({'samples': sliced[0][0], 'noise_mask': sliced[1][0], 'batch_index': sliced[2][0]})
                current_batch = next_batch
            # cat if everything checks out
            else:
                current_batch = self.cat_batch(current_batch, next_batch)

            # add to list if dimensions gone above target batch size
            if current_batch[0].shape[0] > batch_size:
                num = current_batch[0].shape[0] // batch_size
                sliced, remainder = self.slice_batch(current_batch, num, batch_size)
                
                for i in range(num):
                    output_list.append({'samples': sliced[0][i], 'noise_mask': sliced[1][i], 'batch_index': sliced[2][i]})

                current_batch = remainder

        #add remainder
        if current_batch[0] is not None:
            sliced, _ = self.slice_batch(current_batch, 1, batch_size)
            output_list.append({'samples': sliced[0][0], 'noise_mask': sliced[1][0], 'batch_index': sliced[2][0]})

        #get rid of empty masks
        for s in output_list:
            if s['noise_mask'].mean() == 1.0:
                del s['noise_mask']

        return (output_list,)

```
