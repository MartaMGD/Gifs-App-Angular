import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  gifService = inject(GifService);
  // Obtiene la query que hemos definido en la ruta dinámica. Luego, usa un pipe para poder inyectarle JS.
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  // Obtiene la señal computada de los gifs de historial que ya hemos declarado en el servicio
  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });
}
