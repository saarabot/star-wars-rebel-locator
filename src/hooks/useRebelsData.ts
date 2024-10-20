import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decode } from 'js-base64';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { useGetRebelsQuery } from '@/services/rebel';
import { setRebels } from '@/features/rebelsSlice';
import { Rebel } from '@/types';

export const useRebelsData = () => {
  const { data, isLoading } = useGetRebelsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const parsed = JSON.parse(decode(data.message));
      const formattedData = parsed.map((dataItem: Rebel) => ({
        ...dataItem,
        coordinates: new Point(fromLonLat([dataItem.long, dataItem.lat])),
      }));
      dispatch(setRebels(formattedData));
    }
  }, [data, dispatch]);

  return { isLoading };
};
