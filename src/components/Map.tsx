import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feature, Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Icon, Style, Stroke, Fill } from 'ol/style';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { getDistance } from 'ol/sphere';
import { boundingExtent } from 'ol/extent';
import { fromLonLat, toLonLat } from 'ol/proj';
import CircleStyle from 'ol/style/Circle';

import countriesUrl from '@/data/countries.json?url';
import iconUrl from '@/assets/BlackRedMountain.svg?url';
// redux setup
import type { RootState } from '@/store';
import { Rebel } from '@/types';
import { setRebels } from '@/features/rebelsSlice';
import { setLocation } from '@/features/locationSlice';

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [onClickLocation, setOnClickLocation] = useState<Coordinate | null>(
    null
  );
  const [targetsDrawn, setTargetsDrawn] = useState<boolean>(false);

  const targets = useSelector((state: RootState) => state.rebels.rebels);
  const dispatch = useDispatch();

  useEffect(() => {
    if (onClickLocation) {
      // update targets to have distance from on click location in kilometers
      const updatedTargets = targets.map((target: Rebel) => {
        const distance =
          getDistance(onClickLocation, [target.long, target.lat]) / 1000;
        return {
          ...target,
          distance: distance,
        };
      });
      dispatch(setRebels(updatedTargets));
      dispatch(setLocation(onClickLocation));
    }
  }, [onClickLocation]);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      mapRef.current = new Map({
        target: mapContainer.current,
        layers: [
          new VectorLayer({
            background: '#000',
            source: new VectorSource({
              url: countriesUrl,
              format: new GeoJSON(),
            }),
            style: new Style({
              stroke: new Stroke({
                color: 'yellow',
                width: 1,
              }),
              fill: new Fill({
                color: '#f57014',
              }),
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 25]),
          zoom: 2,
        }),
      });

      // Set onclick location on map
      const locationSource = new VectorSource();
      const locationLayer = new VectorLayer({
        source: locationSource,
      });
      const locationStyle = new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: '#06b6d4' }),
          stroke: new Stroke({
            color: 'white',
            width: 3,
          }),
        }),
      });

      mapRef.current.on('click', (event) => {
        locationSource.clear();

        const point = mapRef.current!.getCoordinateFromPixel(event.pixel);
        const p = toLonLat(point);
        setOnClickLocation(p);
        const coordinates = event.coordinate;

        const newMarker = new Feature({
          geometry: new Point(coordinates),
        });
        newMarker.setStyle(locationStyle);

        locationSource.addFeature(newMarker);
      });
      mapRef.current.addLayer(locationLayer);
    }
  }, []);

  useEffect(() => {
    if (targets.length > 0 && mapRef.current && !targetsDrawn) {
      const markerSource = new VectorSource();
      const markerLayer = new VectorLayer({
        source: markerSource,
      });

      const markerStyle = new Style({
        image: new Icon({
          src: iconUrl,
          scale: 0.12,
        }),
      });

      targets.forEach((target) => {
        const feature = new Feature({
          geometry: target.coordinates,
          info: target.id,
          icon: iconUrl,
        });
        feature.setStyle(markerStyle);
        markerSource.addFeature(feature);
      });
      mapRef.current.addLayer(markerLayer);

      // Zoom to fit all markers
      const extent = boundingExtent(
        markerSource.getFeatures().map((feature: Feature) => {
          const geometry = feature.getGeometry();
          return geometry ? (geometry as Point).getCoordinates() : [0, 0];
        })
      );

      mapRef.current
        .getView()
        .fit(extent, { duration: 1000, padding: [200, 50, 50, 50] });

      setTargetsDrawn(true);
    }
  }, [targets]);

  return (
    <div className='h-full w-full mb-3'>
      <div
        ref={mapContainer}
        className='border-2 border-orange-500 h-80 sm:h-96 lg:h-[32rem]'
      ></div>
    </div>
  );
};

export default MapComponent;
