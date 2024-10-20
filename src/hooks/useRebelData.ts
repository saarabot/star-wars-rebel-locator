import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Rebel, RebelInfo } from '@/types';

const mergeData = (rebels: Rebel[], rebelInfos: RebelInfo[]) => {
  const combinedList = [...rebelInfos, ...rebels] as RebelInfo[];
  const mergedMap = combinedList.reduce((map, rebel) => {
    if (map.has(rebel.id)) {
      map.set(rebel.id, { ...map.get(rebel.id), ...rebel });
    } else {
      map.set(rebel.id, { ...rebel });
    }
    return map;
  }, new Map<number, RebelInfo>());
  const mergedInfos = Array.from(mergedMap.values());
  mergedInfos.sort((a, b) => a.distance! - b.distance!);
  return mergedInfos;
};

const fetchRebelData = async (rebels: Rebel[]) => {
  const fetchUrls = rebels.map(
    (rebel) => `https://akabab.github.io/starwars-api/api/id/${rebel.id}.json`
  );
  const fetchPromises = fetchUrls.map((url) =>
    fetch(url).then((response) => response.json())
  );
  const responses = await Promise.all(fetchPromises);
  return responses as RebelInfo[];
};

export const useRebelData = () => {
  const rebels = useSelector((state: RootState) => state.rebels.rebels);
  const location = useSelector((state: RootState) => state.location.location);
  const [rebelData, setRebelData] = useState<RebelInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const fetchedData = await fetchRebelData(rebels);
      setRebelData(fetchedData);
      setLoading(false);
      setRebelData(mergeData(rebels, fetchedData));
    };

    if (location && !rebelData) {
      loadData();
    }
  }, [rebels, location]);

  useEffect(() => {
    if (location && rebelData) {
      const mergedData = mergeData(rebels, rebelData);
      setRebelData(mergedData);
    }
  }, [location]); // Re-merge data when location changes

  return { rebelData, loading, location };
};
